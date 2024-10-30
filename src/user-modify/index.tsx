import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import './index.less';

export default function MyTagInput() {
  const inputTag = useRef<HTMLDivElement>(null);
  const [showTips, setShowTips] = useState(false);

  const handleInput = (e) => {
    setShowTips(!e.target.textContent?.length);
  };
  // 鼠标焦点对象
  const [Range, setRange] = useState<Range>();
  const [contentId] = useState(() => `a-tag-input-${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`);

  useEffect(() => {
    if (inputTag.current) {
      setShowTips(!(inputTag as any).current.textContent.length);
    }
    const selecthandler = () => {
      // 监听选定文本的移动
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

  const insertNode = (node: Element) => {
    // 删掉选中的内容（如有）
    Range && Range.deleteContents();
    // 插入链接
    Range && Range.insertNode(node);
    Range?.collapse(false);
    if (inputTag.current) {
      requestAnimationFrame(() => {
        inputTag.current?.focus();
        setShowTips(!(inputTag as any).current.textContent.length);
      });
    }
  };
  // 添加标签
  const addTag = (text: string) => {
    let node = document.createElement('i');
    node.innerText = text;
    // const cancelNode = document.createElement('span');
    // cancelNode.innerText = '✕';
    // cancelNode.style.color = 'black';
    // cancelNode.onclick = (even) => {
    //   inputTag.current?.removeChild((even.target as any).parentElement);
    // };
    // node.append(cancelNode);
    insertNode(node);
  };

  return (
    <>
      <div className='tagTextAreaWrapper'>
        <div
          className='myTextArea'
          onInput={handleInput}
          ref={inputTag}
          id={contentId}
          onFocus={() => {
            console.log('focus');
          }}
          onClick={(e) => {
            const ele = e?.target as HTMLElement;
            console.log('==onClick====>', ele);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              console.log('==onKeyDown====>', e.target);
            }
          }}
        ></div>
        {showTips && <div className='my-tips'>请输入</div>}
      </div>
      <Button
        style={{
          marginTop: 16,
        }}
        onClick={() => addTag('变量1')}
        type='primary'
      >
        插入Tag
      </Button>
    </>
  );
}

// -webkit-user-modify
// 这是个css属性，通过对应属性的设置也可以达到同样的效果。
// read-only： 默认值，元素只读，不可编辑；

// read-write： 可以编辑，支持富文本；

// read-write-plaintext-only： 可以编辑，不支持富文本；

// write-only： 使元素仅用于编辑（几乎没有浏览器支持）
