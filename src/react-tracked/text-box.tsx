import { Input } from 'antd';
import { useSharedState } from './store';
import { memo } from 'react';

const TextBox = () => {
  const [state, setState] = useSharedState();
  const setText = (text) => {
    setState((prev) => ({ ...prev, text }));
  };
  return (
    <div>
      TextBox - {Math.random()}
      <br />
      <Input value={state.text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default memo(TextBox);
