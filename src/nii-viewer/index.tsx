import * as nifti from 'nifti-reader-js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type TypedImageData =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

type Volume = {
  fileName: string;
  header: any;
  data: TypedImageData;
  dims: { x: number; y: number; z: number };
  slope: number;
  intercept: number;
  min: number;
  max: number;
};

function toArrayBuffer(buf: ArrayBufferLike): ArrayBuffer {
  if (buf instanceof ArrayBuffer) return buf;

  // nifti-reader-js types `decompress()` as `ArrayBufferLike` (may include SharedArrayBuffer)
  // but downstream APIs expect a real ArrayBuffer.
  const view = new Uint8Array(buf);
  const copy = new Uint8Array(view.byteLength);
  copy.set(view);
  return copy.buffer;
}

function getTypedData(header: any, imageBuffer: ArrayBuffer): TypedImageData {
  switch (header.datatypeCode) {
    case nifti.NIFTI1.TYPE_INT8:
      return new Int8Array(imageBuffer);
    case nifti.NIFTI1.TYPE_UINT8:
      return new Uint8Array(imageBuffer);
    case nifti.NIFTI1.TYPE_INT16:
      return new Int16Array(imageBuffer);
    case nifti.NIFTI1.TYPE_UINT16:
      return new Uint16Array(imageBuffer);
    case nifti.NIFTI1.TYPE_INT32:
      return new Int32Array(imageBuffer);
    case nifti.NIFTI1.TYPE_UINT32:
      return new Uint32Array(imageBuffer);
    case nifti.NIFTI1.TYPE_FLOAT32:
      return new Float32Array(imageBuffer);
    case nifti.NIFTI1.TYPE_FLOAT64:
      return new Float64Array(imageBuffer);
    default:
      throw new Error(`Unsupported NIFTI datatypeCode: ${String(header.datatypeCode)}`);
  }
}

function computeMinMax(data: TypedImageData, slope: number, intercept: number): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < data.length; i++) {
    const raw = Number(data[i]);
    if (!Number.isFinite(raw)) continue;

    const v = raw * slope + intercept;
    if (!Number.isFinite(v)) continue;

    if (v < min) min = v;
    if (v > max) max = v;
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1 };
  if (min === max) return { min, max: min + 1 };
  return { min, max };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function drawAxialSlice(canvas: HTMLCanvasElement, volume: Volume, sliceIndex: number) {
  const { x: width, y: height, z: depth } = volume.dims;
  const z = clamp(Math.floor(sliceIndex), 0, Math.max(0, depth - 1));

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const numPixels = width * height;
  const offset = z * numPixels;

  const imageData = ctx.createImageData(width, height);
  const out = imageData.data;

  const range = volume.max - volume.min;
  for (let i = 0; i < numPixels; i++) {
    const raw = Number(volume.data[offset + i]);
    const v = raw * volume.slope + volume.intercept;

    const t = range === 0 ? 0 : (v - volume.min) / range;
    const gray = clamp(Math.round(t * 255), 0, 255);

    const j = i * 4;
    out[j] = gray;
    out[j + 1] = gray;
    out[j + 2] = gray;
    out[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

const NiiViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<Volume | null>(null);
  const [sliceIndex, setSliceIndex] = useState(0);

  const maxSlice = useMemo(() => {
    if (!volume) return 0;
    return Math.max(0, volume.dims.z - 1);
  }, [volume]);

  const loadFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError('');

    try {
      let arrayBuffer = await file.arrayBuffer();

      if (nifti.isCompressed(arrayBuffer)) {
        arrayBuffer = toArrayBuffer(nifti.decompress(arrayBuffer));
      }

      if (!nifti.isNIFTI(arrayBuffer)) {
        throw new Error('Not a valid NIFTI file (.nii or .nii.gz)');
      }

      const header = nifti.readHeader(arrayBuffer);
      const imageBuffer = nifti.readImage(header, arrayBuffer) as ArrayBuffer;
      const data = getTypedData(header, imageBuffer);

      const x = Number(header.dims?.[1] ?? 0);
      const y = Number(header.dims?.[2] ?? 0);
      const z = Number(header.dims?.[3] ?? 0);

      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) || x <= 0 || y <= 0 || z <= 0) {
        throw new Error(`Invalid NIFTI dims: ${String(header.dims)}`);
      }

      const slopeRaw = Number(header.scl_slope);
      const interceptRaw = Number(header.scl_inter);
      const slope = Number.isFinite(slopeRaw) && slopeRaw !== 0 ? slopeRaw : 1;
      const intercept = Number.isFinite(interceptRaw) ? interceptRaw : 0;

      const { min, max } = computeMinMax(data, slope, intercept);

      const nextVolume: Volume = {
        fileName: file.name,
        header,
        data,
        dims: { x, y, z },
        slope,
        intercept,
        min,
        max,
      };

      setVolume(nextVolume);
      setSliceIndex((prev) => clamp(prev, 0, Math.max(0, z - 1)));
    } catch (e) {
      setVolume(null);
      setSliceIndex(0);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !volume) return;
    drawAxialSlice(canvas, volume, sliceIndex);
  }, [volume, sliceIndex]);

  const onChooseFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      void loadFile(file);
      e.target.value = '';
    },
    [loadFile],
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      void loadFile(file);
    },
    [loadFile],
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>NIFTI Viewer</div>

      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
          border: '1px dashed #999',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          background: '#fafafa',
        }}
      >
        <div style={{ marginBottom: 8 }}>拖拽 .nii / .nii.gz 到这里，或选择文件：</div>
        <input type="file" accept=".nii,.nii.gz" onChange={onChooseFile} />
        {isLoading ? <div style={{ marginTop: 8 }}>加载中...</div> : null}
        {error ? <div style={{ marginTop: 8, color: 'crimson' }}>{error}</div> : null}
      </div>

      {volume ? (
        <>
          <div style={{ marginBottom: 8 }}>
            <div>文件：{volume.fileName}</div>
            <div>
              维度：{volume.dims.x} × {volume.dims.y} × {volume.dims.z}（Axial / Z）
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 120 }}>切片：{sliceIndex}</div>
            <input
              type="range"
              min={0}
              max={maxSlice}
              step={1}
              value={sliceIndex}
              onChange={(e) => setSliceIndex(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <div style={{ width: 120, textAlign: 'right' }}>/ {maxSlice}</div>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                width: Math.min(640, volume.dims.x),
                height: 'auto',
                imageRendering: 'pixelated',
                background: '#000',
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NiiViewer;
