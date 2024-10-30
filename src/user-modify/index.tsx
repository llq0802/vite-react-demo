import { useRef, useState } from 'react';
import { Button } from 'antd';
import clx from 'classnames';
import styles from './index.module.less';
import { useControllableValue, useMount } from 'ahooks';
import useSelectionChange from './useSelectionchange';

const regex1 = /<i\s[^>]*data-tagvalue="([^"]+)">([^<]+)<\/i>/g;
const regex2 = /{{#(\d+)\.([^#]+)#}}/g;

export default function TagInput(props) {
  const { placeholder = '请输入', style, className, inputStyle, inputClassName, placeholderStyle } = props;
  const [state, setState] = useControllableValue<string>(props, {
    // defaultValue: '',
    defaultValue: '45354{{#123.logo_name#}}2344{{#456.logo_name2#}}',
  });
  const inputRef = useRef<HTMLDivElement>(null);
  const [showPlaceholder, setshowPlaceholder] = useState(true);
  const [contentId] = useState(() => `a-tag-input-${new Date().getTime()}-${Math.ceil(Math.random() * 1000)}`);
  const { rangeObj } = useSelectionChange(contentId);

  const handleInput = (e) => {
    const textContent = e.target.textContent;
    const innerHTML = e.target.innerHTML;
    setshowPlaceholder(!textContent?.length);
    let replacedStr = innerHTML.replace(regex1, function (match, p1: string, p2: string) {
      return `{{#${p1}.${p2}#}}`;
    });
    if (replacedStr === '<br>' || replacedStr === '' || replacedStr === '<br/>') {
      replacedStr = '';
    }
    setState(replacedStr);
  };

  // 添加标签
  const addTag = (text: string) => {
    if (!text) return;
    const textArr = text.split('.');
    const t1 = textArr[0];
    const t2 = textArr[1];
    const node = document.createElement('i');
    node.dataset['tagvalue'] = t1; // 标签data-tag
    node.innerText = `${t2}`;
    if (rangeObj) {
      rangeObj.deleteContents();
      rangeObj.insertNode(node);
      rangeObj?.collapse(false);
    } else {
      inputRef.current?.appendChild(node);
    }
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      setshowPlaceholder(!(inputRef as any).current.textContent.length);
    });
    handleInput({ target: inputRef.current });
  };

  useMount(() => {
    if (!state) return;
    const newStr = state.replace(regex2, function (match, p1, p2) {
      return '<i data-tagvalue="' + p1 + '">' + p2 + '</i>';
    });
    inputRef.current.innerHTML = newStr;
    requestAnimationFrame(() => {
      setshowPlaceholder(!inputRef.current?.textContent?.length);
    });
  });

  return (
    <>
      <div className={clx(styles.a_tag_input_wrapper, className)} style={style}>
        <div
          // contentEditable
          ref={inputRef}
          className={clx(styles.a_tag_input, inputClassName)}
          style={inputStyle}
          id={contentId}
          onInput={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        ></div>
        {showPlaceholder && (
          <div className={styles.placeholder} style={placeholderStyle}>
            {placeholder}
          </div>
        )}
      </div>

      <Button
        onClick={() => {
          inputRef.current?.focus();
          requestAnimationFrame(() => {
            addTag('123.logo_name');
          });
        }}
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
