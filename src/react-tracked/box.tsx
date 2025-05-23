import Counter from './counter';
import TextBox from './text-box';
import { useSharedState } from './store';
import { Button, Divider } from 'antd';

const Box = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState((prev) => ({ ...prev, box: prev.box + 1 }));
  };

  return (
    <div>
      <p>Box - {Date.now()}</p>
      <p>{state.box}</p>
      <Button onClick={increment}>Box+1</Button>
      <Divider></Divider>
      <Counter />
      <Divider></Divider>
      <TextBox />
    </div>
  );
};

export default Box;
