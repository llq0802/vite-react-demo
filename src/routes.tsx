import { RouteObject } from 'react-router-dom';
import Home from './home';
import DynamicForm from './dynamic-form';
import TestForm from './test-form';
import CanvasLogo from './canvas-logo';
import WebSocket from './web-socket';
import TagInput from './tag-input';
import Lexical from './lexical';
import MyReactQuill from './react-quill';
import MyTagInput from './user-modify';
import DragList from './drag-list';
import AutoAnimate from './auto-animate';
import ReactTracked from './react-tracked';
import TanstackReactVirtual from './tanstack-react-virtual';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
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
];

export default routes;
