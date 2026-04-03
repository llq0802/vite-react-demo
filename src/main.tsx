import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const px2rem = px2remTransformer({
  rootValue: 16,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StyleProvider layer transformers={[px2rem]}>
      <ConfigProvider
        theme={{
          zeroRuntime: true,
        }}
      >
        <App />
      </ConfigProvider>
    </StyleProvider>
  </BrowserRouter>,
);
