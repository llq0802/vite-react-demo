import React, { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Space } from 'antd';

const AutoAnimate = () => {
  const [items, setItems] = useState([0, 1, 2, 3]);
  const [parent, enableAnimations] = useAutoAnimate({
    disrespectUserMotionPreference: true,
    easing: 'ease',
    duration: 240,
  });
  const add = () => setItems([...items, items.length]);
  const shuffle = () => setItems([...items].sort(() => Math.random() - 0.5));
  return (
    <>
      <ul ref={parent}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <br />

      <Space>
        <Button onClick={add}>Add number</Button>
        <Button onClick={shuffle}>sort</Button>
        <Button onClick={() => enableAnimations(false)}>Disable</Button>
        <Button onClick={() => enableAnimations(true)}>Enable</Button>
      </Space>
    </>
  );
};

export default AutoAnimate;
