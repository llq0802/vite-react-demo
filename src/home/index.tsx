import { Button, Flex, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useInterval, useLatest, useMount, useRequest, useUpdateEffect, useUpdateLayoutEffect } from 'ahooks';
import { findLastTextNode, mockRequest } from './utils';
import './index.less';
import TestComponent from './test';
import Cmp from './cmp';

const content = `lorem ipsum大萨达撒大萨达撒大萨达撒大萨达撒大萨达撒大萨达撒大萨达撒
啊实打实
嘎达嘎达
感受到
gsd gs点过
说的
gsdg说的
d撒打算gsdg说的
gd是
感受到
sg点过
ds gsd个
十多个
df好
dfsd gsddsdsgsd
gs的g说的
gsd gsd gsd个ds
十多个
gd dsg说的gsd
gsd g说的
gsd
gsd gsd gsd个ds
gsd gsd gsd个ds
gsd gsd gsd个ds`;

export default () => {
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null!);
  const [state, setState] = useState('');
  const { loading, runAsync } = useRequest(mockRequest, {
    manual: true,
    onSuccess: () => {
      console.log('==onSuccess====>');
    },
    onError() {
      console.log('==onError====>');
    },
    onFinally() {
      console.log('==onFinally====>');
    },
  });

  const onClick = async () => {
    try {
      await runAsync(state);
      console.log('=== 成功 ===>');
    } catch (error) {
      console.log('=== 失败 ===>');
    }

    // setState('');
    // try {
    //   await runAsync(state);
    //   setState('');
    //   console.log('==try-success====>');
    // } catch (error) {
    //   console.log('==catch-onError====>');
    // }
    // console.log('==onClick====>');
    // try {
    //   console.log('=== try===>');
    //   // return 1;
    //   throw 2;
    // } catch (error) {
    //   console.log('=== catch===>');
    // } finally {
    //   console.log('=== finally===>');
    // }
    // [11, 22, 33, 44].forEach((it, i) => {
    //   if (i === 1) {
    //     return 1;
    //   }
    //   console.log(it);
    // });
    // return 2;
  };

  // const setCursor = () => {
  //   const lastTextNode = findLastTextNode(ref.current!);
  //   // const prev = document.querySelector('.cursor2');
  //   // if (prev) {
  //   //   prev.remove();
  //   // }
  //   // const dom = document.createElement('span');
  //   // dom.className = 'cursor2';
  //   // lastTextNode.parentElement?.appendChild(dom);

  //   const newText = document.createTextNode('|');
  //   if (lastTextNode) {
  //     lastTextNode.after(newText);
  //   } else {
  //     ref.current.appendChild(newText);
  //   }
  //   const range = document.createRange();
  //   range.setStart(newText, 0);
  //   range.setEnd(newText, 0);
  //   const rect = range.getBoundingClientRect();
  //   const containerRect = ref.current.getBoundingClientRect();
  //   const x = rect.left - containerRect.left + 1;
  //   const y = rect.top - containerRect.top;
  //   const cursorDom = document.querySelector('.cursor') as HTMLElement;
  //   cursorDom.style.transform = `translate(${x}px, ${y}px)`;
  //   // cursorDom.style.left = x + 'px';
  //   // cursorDom.style.top = y + 'px';
  //   newText.remove();
  // };

  // const [str, setStr] = useState('');
  // const preRef = useRef(null);
  // const index = useRef(0);
  // const clear = useInterval(() => {
  //   preRef.current.innerHTML = '';
  //   if (index.current === content.length - 1) {
  //     clear();
  //   }
  //   const curStr = content[index.current];
  //   setStr((str) => str + curStr);
  //   index.current = index.current + 1;
  // }, 50);
  // useUpdateLayoutEffect(() => {
  //   // ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
  //   ref.current.clientHeight;
  //   setCursor();
  // }, [str]);

  const [count, setCount] = useState(0);
  const countRef = useLatest(count);

  return (
    <div className='w-full h-full p-8 mb-4 border-[1px] box-border'>
      <Flex>
        <Input
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder='Please enter username'
          style={{ width: 240, marginRight: 16 }}
        />
        <Button
          disabled={loading}
          onClick={() => {
            const ret = onClick();

            console.log('===ret===>', ret);
          }}
        >
          {loading ? 'Loading' : 'Edit'}
        </Button>
      </Flex>

      <div className='container-text' ref={ref}>
        <ul>
          {/* <pre ref={preRef} className='pre'>
            {str}
          </pre> */}
          {/* <li>Lorem ipsum dolor sit.</li>
          <li>Lorem.</li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis odio harum est? Rem labore quasi
            modi, placeat quod dolorum vitae numquam expedita ducimus ipsum molestiae nam possimus, saepe enim vero.
          </li>
          <li>
            <p>798</p>
            <p>Lorem, ipsum dolor.好</p>
          </li> */}
        </ul>

        {/* <div className='cursor'></div> */}
      </div>

      <Flex vertical gap={24}>
        <div className='contain-paint'>
          <div className='paint'></div>
        </div>

        <div className='contain-size'>
          <div className='size'></div>
        </div>
      </Flex>

      <Flex vertical>
        <Button
          type='primary'
          onClick={async () => {
            setCount(count + 1);
            setTimeout(() => {
              console.log('===countRef.current===>', countRef.current);
            });
          }}
        >
          测试 {count}
        </Button>

        <TestComponent></TestComponent>
        <Cmp></Cmp>
      </Flex>
    </div>
  );
};
