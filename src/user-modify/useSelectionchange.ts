import { useMemoizedFn, useMount } from 'ahooks';
import { useRef, useState } from 'react';

export default function useSelectionChange(readOnly = false) {
  const rangeObjRef = useRef<Range>();
  const selRef = useRef<Selection>();
  const [contentId] = useState(() => `a-tag-input-${Date.now()}`);

  const selecthandler = useMemoizedFn(() => {
    if (readOnly) return;
    selRef.current = window.getSelection()!;
    const range = selRef.current ? (selRef.current.rangeCount > 0 ? selRef.current?.getRangeAt(0) : null) : null;
    // const sel = window.parent.getSelection();
    // if (range && range.commonAncestorContainer.ownerDocument?.activeElement?.id === contentId) {
    //   rangeObjRef.current = range;
    // }
    if (range && document?.activeElement?.id === contentId) {
      rangeObjRef.current = range;
    }
  });

  useMount(() => {
    document.addEventListener('selectionchange', selecthandler);
    return () => {
      document.removeEventListener('selectionchange', selecthandler);
    };
  });

  return {
    rangeObjRef,
    selRef,
    contentId,
  };
}
