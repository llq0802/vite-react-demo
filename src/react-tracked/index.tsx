import { useMount } from 'ahooks';
import Box from './box';
import { SharedStateProvider } from './store';

const ReactTracked = () => {
  useMount(() => {
    for (let index = 0; index < 5; index++) {
      console.log('===index===>', index);
    }

    console.log('mounted');
  });
  return (
    <SharedStateProvider>
      <div>
        <Box></Box>
      </div>
    </SharedStateProvider>
  );
};

export default ReactTracked;
