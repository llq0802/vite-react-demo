import { Input } from 'antd';
import { useSharedState } from './store';

const TextBox = () => {
  const [state, setState] = useSharedState();
  const setText = (text) => {
    setState((prev) => ({ ...prev, text }));
  };
  console.log('===TextBox===>');
  return (
    <div>
      TextBox - {Math.random()}
      <br />
      {state.text}
      <Input value={state.text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default TextBox;
