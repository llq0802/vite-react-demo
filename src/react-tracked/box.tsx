import Counter from './counter';
import TextBox from './text-box';
import { useSharedState } from './store';
import { Button } from 'antd';

const Box = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState((prev) => ({ ...prev, box: prev.box + 1 }));
  };
  1112;
  return (
    <div>
      <Counter />
      <TextBox />
      <hr />
      Box - {Math.random()}
      <br />
      <>{state.box}</>
      <Button onClick={increment}>+1</Button>
    </div>
  );
};

export default Box;