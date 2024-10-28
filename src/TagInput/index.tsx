import React, { useRef, useEffect } from 'react';

const ContentEditable = () => {
  const editableRef = useRef(null);

  // 监听键盘事件
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveCursorLeft(editableRef.current);
          event.preventDefault();
          break;
        case 'ArrowRight':
          moveCursorRight(editableRef.current);
          event.preventDefault();
          break;
        case 'Backspace':
          deleteTextBeforeCursor(editableRef.current);
          event.preventDefault();
          break;
        case 'Delete':
          deleteTextAfterCursor(editableRef.current);
          event.preventDefault();
          break;
        default:
          break;
      }
    };

    const handleFocus = () => {
      adjustCursorOnFocus(editableRef.current);
    };

    const editableElement = editableRef.current;
    editableElement.addEventListener('keydown', handleKeyDown);
    editableElement.addEventListener('click', handleFocus);

    // 清理事件监听器
    return () => {
      editableElement.removeEventListener('keydown', handleKeyDown);
      editableElement.removeEventListener('click', handleFocus);
    };
  }, []);

  // 移动光标到左边
  const moveCursorLeft = (contentEditableElement) => {
    const sel = window.getSelection();
    if (sel.rangeCount <= 0) return;
    const range = sel.getRangeAt(0);
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    console.log('==moveCursorLeft====>', range);
    if (startOffset > 0) {
      range.setStart(startContainer, startOffset - 1);
      range.collapse(true);
    } else if (startContainer.previousSibling && startContainer.previousSibling?.dataset?.nodetype === 'tag') {
      const prevNode = startContainer.previousSibling;
      range.setStart(prevNode, 0);
      range.collapse(true);
    }
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // 移动光标到右边
  const moveCursorRight = (contentEditableElement) => {
    const sel = window.getSelection();
    if (sel.rangeCount <= 0) return;
    const range = sel.getRangeAt(0);

    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    console.log('==moveCursorRight====>', range);
    debugger;
    if (startOffset < startContainer.textContent.length) {
      range.setStart(startContainer, startOffset + 1);
      range.collapse(true);
    } else if (startContainer.nextSibling && startContainer.nextSibling?.dataset?.nodetype === 'tag') {
      const nextNode = startContainer.nextSibling;
      // range.selectNodeContents(nextNode); // 选择整个div的内容
      range.setEnd(nextNode, 1);
      range.collapse(false); // 将范围折叠到开始位置
    }

    sel.removeAllRanges();
    sel.addRange(range);
  };

  // 删除光标前的文本
  const deleteTextBeforeCursor = (contentEditableElement) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;

      if (startOffset > 0) {
        if (isTagElement(startContainer)) {
          // 如果光标前是标签元素，删除整个标签
          const prevNode = startContainer.previousSibling;
          startContainer.parentNode.removeChild(startContainer);
          range.setStart(prevNode, prevNode ? prevNode.textContent.length : 0);
          range.collapse(true);
        } else {
          const newRange = document.createRange();
          newRange.setStart(startContainer, startOffset - 1);
          newRange.setEnd(startContainer, startOffset);
          newRange.deleteContents();
          range.setStart(startContainer, startOffset - 1);
          range.collapse(true);
        }
      } else if (startContainer.previousSibling) {
        const prevNode = startContainer.previousSibling;
        if (isTagElement(prevNode)) {
          // 如果光标前是标签元素，删除整个标签
          prevNode.parentNode.removeChild(prevNode);
          range.setStart(startContainer, 0);
          range.collapse(true);
        } else {
          const newRange = document.createRange();
          newRange.setStart(prevNode, prevNode.textContent.length - 1);
          newRange.setEnd(prevNode, prevNode.textContent.length);
          newRange.deleteContents();
          range.setStart(prevNode, prevNode.textContent.length - 1);
          range.collapse(true);
        }
      }

      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  // 删除光标后的文本
  const deleteTextAfterCursor = (contentEditableElement) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;

      if (startOffset < startContainer.textContent.length) {
        if (isTagElement(startContainer)) {
          // 如果光标后是标签元素，删除整个标签
          const nextNode = startContainer.nextSibling;
          startContainer.parentNode.removeChild(startContainer);
          range.setStart(nextNode, 0);
          range.collapse(true);
        } else {
          const newRange = document.createRange();
          newRange.setStart(startContainer, startOffset);
          newRange.setEnd(startContainer, startOffset + 1);
          newRange.deleteContents();
          range.collapse(true);
        }
      } else if (startContainer.nextSibling) {
        const nextNode = startContainer.nextSibling;
        if (isTagElement(nextNode)) {
          // 如果光标后是标签元素，删除整个标签
          nextNode.parentNode.removeChild(nextNode);
          range.setStart(startContainer, startOffset);
          range.collapse(true);
        } else {
          const newRange = document.createRange();
          newRange.setStart(nextNode, 0);
          newRange.setEnd(nextNode, 1);
          newRange.deleteContents();
          range.setStart(nextNode, 0);
          range.collapse(true);
        }
      }

      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  // 检查是否为标签元素
  const isTagElement = (node) =>
    node?.parentElement && node.parentElement.dataset.nodetype === 'tag' && node.parentElement.nodeName === 'B';

  // 聚焦时调整光标位置
  const adjustCursorOnFocus = (contentEditableElement) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const startContainer = range.startContainer;
      if (isTagElement(startContainer)) {
        if (startContainer.textContent.length !== range.startOffset) {
          range.setStart(
            startContainer.parentElement?.previousSibling,
            startContainer.parentElement?.previousSibling.textContent?.length
          );
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  };

  return (
    <>
      <div
        suppressContentEditableWarning
        ref={editableRef}
        contentEditable='true'
        style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}
      >
        This <b data-nodetype='tag'>contenteditable</b>
        element.
      </div>
    </>
  );
};

export default ContentEditable;
