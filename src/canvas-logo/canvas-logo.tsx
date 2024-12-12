import { useMount } from 'ahooks';
import React from 'react';
import { calculatePoints } from './utils';

const canvasStyle: React.CSSProperties = {
  width: 300,
  height: 300,
  backgroundColor: '#c9282f',
};

const CanvasLogo = () => {
  const ref = React.useRef<HTMLCanvasElement>(null!);
  const initCanvas = () => {
    const canvas = ref.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = (canvasStyle.width as number) * dpr;
    canvas.height = (canvasStyle.height as number) * dpr;
    canvas.style.width = `${canvasStyle.width}px`;
    canvas.style.height = `${canvasStyle.height}px`;
  };
  useMount(() => {
    const dpr = window.devicePixelRatio || 1;
    const radius = 12 * dpr;
    const gap = 100 * dpr;
    initCanvas();
    const canvas = ref.current;
    const ctx = canvas.getContext('2d')!;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const points = calculatePoints(centerX, centerY, gap);
    const { topLeft, topRight, bottomLeft, bottomRight, topCenter, bottomCenter, leftCenter, rightCenter } = points;
    ctx.strokeStyle = '#fff'; // 设置线条颜色
    ctx.lineWidth = 5 * dpr; // 设置线条宽度
    // 绘制对角线
    ctx.beginPath();

    // 左上角到右下角的对角线
    ctx.moveTo(topLeft[0], topLeft[1]);
    ctx.lineTo(bottomRight[0], bottomRight[1]);
    // 右上角到左下角的对角线
    ctx.moveTo(topRight[0], topRight[1]);
    ctx.lineTo(bottomLeft[0], bottomLeft[1]);
    ctx.stroke(); // 绘制线条

    //
    ctx.beginPath();
    ctx.moveTo(topCenter[0], topCenter[1]);
    ctx.lineTo(rightCenter[0], rightCenter[1]);
    ctx.lineTo(bottomCenter[0], bottomCenter[1]);
    ctx.lineTo(leftCenter[0], leftCenter[1]);
    ctx.closePath();
    ctx.stroke(); // 绘制线条
    //
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    Object.keys(points).forEach((key) => {
      const point = points[key as keyof typeof points];
      ctx.beginPath();
      ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  });
  return (
    <div>
      <canvas ref={ref} style={canvasStyle} />
    </div>
  );
};

export default CanvasLogo;
