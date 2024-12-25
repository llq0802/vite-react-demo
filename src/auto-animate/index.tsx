// import React, { useState } from 'react';
// import { useAutoAnimate } from '@formkit/auto-animate/react';
// import { Button, Space } from 'antd';

// const AutoAnimate = () => {
//   const [items, setItems] = useState([0, 1, 2, 3]);
//   const [parent, enableAnimations] = useAutoAnimate({
//     disrespectUserMotionPreference: true,
//     easing: 'ease',
//     duration: 240,
//   });
//   const add = () => setItems([...items, items.length]);
//   const shuffle = () => setItems([...items].sort(() => Math.random() - 0.5));
//   return (
//     <>
//       <ul ref={parent}>
//         {items.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//       <br />

//       <Space>
//         <Button onClick={add}>Add number</Button>
//         <Button onClick={shuffle}>sort</Button>
//         <Button onClick={() => enableAnimations(false)}>Disable</Button>
//         <Button onClick={() => enableAnimations(true)}>Enable</Button>
//       </Space>
//     </>
//   );
// };

// export default AutoAnimate;

import React, { useState, useRef, useLayoutEffect } from 'react';
import './index.less'; // 引入 CSS 文件
import { useLatest } from 'ahooks';

const ToggleAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useLatest(isVisible);
  const nodeRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useLayoutEffect(() => {
    if (nodeRef.current) {
      if (isVisible) {
        nodeRef.current.style.display = 'block';
        // nodeRef.current.offsetWidth;
        // nodeRef.current.style.opacity = '1';
        requestAnimationFrame(() => {
          nodeRef.current.style.opacity = '1';
        });
      } else {
        nodeRef.current.style.opacity = '0';
        nodeRef.current.addEventListener(
          'transitionend',
          () => {
            if (!isVisibleRef.current) {
              nodeRef.current.style.display = 'none';
            }
          },
          { once: true }
        );
      }
    }
  }, [isVisible]);

  return (
    <div>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>
      <div ref={nodeRef} className='box'></div>
    </div>
  );
};

export default ToggleAnimation;
