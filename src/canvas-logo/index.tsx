import { useState } from 'react';
import CanvasLogo from './canvas-logo';
import { Button } from 'antd';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>点击</Button>
      <br />
      <CanvasLogo count={count}></CanvasLogo>
    </>
  );
};
