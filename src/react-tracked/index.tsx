import Box from './box';
import { SharedStateProvider } from './store';

const ReactTracked = () => (
  <SharedStateProvider>
    <div>
      <Box></Box>
    </div>
  </SharedStateProvider>
);

export default ReactTracked;
