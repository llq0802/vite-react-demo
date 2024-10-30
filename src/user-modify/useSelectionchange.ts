import { useEffect, useState } from 'react';

export default function useSelectionChange(contentId: string) {
  const [rangeObj, setRange] = useState<Range>();

  useEffect(() => {
    const selecthandler = () => {
      let sel = window.getSelection();
      let range = sel ? (sel.rangeCount > 0 ? sel?.getRangeAt(0) : null) : null;
      if (range && range.commonAncestorContainer.ownerDocument?.activeElement?.id === contentId) {
        setRange(range);
      }
    };
    document.addEventListener('selectionchange', selecthandler);
    return () => {
      document.removeEventListener('selectionchange', selecthandler);
    };
  }, []);

  return {
    rangeObj,
    setRange,
  };
}
