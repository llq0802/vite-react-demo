import { RouteObject } from 'react-router-dom';
import AntdFrom from './antd-from';
import AutoAnimate from './auto-animate';
import CanvasLogo from './canvas-logo';
import CodeEngine from './code-engine';
import DragList from './drag-list';
import DynamicForm from './dynamic-form';
import Echarts from './echarts';
import Home from './home';
import InfiniteScroll from './infinite-scroll';
import Lexical from './lexical';
import MessageList from './message-list';
import Penpal from './penpal';
import MyReactQuill from './react-quill';
import ReactTracked from './react-tracked';
import TagInput from './tag-input';
import Tailwindcss from './tailwindcss';
import TanstackReactVirtual from './tanstack-react-virtual';
import TestForm from './test-form';
import MyTagInput from './user-modify';
import WebSocket from './web-socket';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/message-list', element: <MessageList /> },
  { path: '/dynamic-form', element: <DynamicForm /> },
  { path: '/test-form', element: <TestForm /> },
  { path: '/drag-list', element: <DragList /> },
  { path: '/about', element: <CanvasLogo /> },
  { path: '/websocket', element: <WebSocket /> },
  { path: '/tag-input', element: <TagInput /> },
  { path: '/lexical', element: <Lexical /> },
  { path: '/react-quill', element: <MyReactQuill /> },
  { path: '/user-modify', element: <MyTagInput /> },
  { path: '/auto-animate', element: <AutoAnimate /> },
  { path: '/react-tracked', element: <ReactTracked /> },
  { path: '/tanstack-react-virtual', element: <TanstackReactVirtual /> },
  { path: '/tailwindcss', element: <Tailwindcss /> },
  { path: '/infinite-scroll', element: <InfiniteScroll /> },
  { path: '/antd-from', element: <AntdFrom /> },
  { path: '/code-engine', element: <CodeEngine /> },
  { path: '/penpal', element: <Penpal /> },
  { path: '/echarts', element: <Echarts /> },
];

export default routes;
