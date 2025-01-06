import { Button } from 'antd';
import { useSharedState } from './store';
import { memo } from 'react';

const Counter = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  return (
    <div>
      Counter - {Math.random()}
      <br />
      <>{state.count}</>
      <Button onClick={increment}>+1</Button>
    </div>
  );
};

export default memo(Counter);
