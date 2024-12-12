import { Flex } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import WebSocket from './web-socket';
import TagInput from './tag-input';
import Lexical from './lexical';
import MyReactQuill from './react-quill';
import TestForm from './test-form';
import MyTagInput from './user-modify';
import DynamicForm from './dynamic-form';
import Home from './home';

function App() {
  return (
    <BrowserRouter>
      <Flex gap={10} justify='center' style={{ marginBottom: 32 }}>
        <NavLink
          to='/'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          home
        </NavLink>
        <NavLink
          to='/about'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          about
        </NavLink>
        <NavLink
          to='/websocket'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          websocket
        </NavLink>
        <NavLink
          to='/tag-input'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          TagInput
        </NavLink>
        <NavLink
          to='/lexical'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          Lexical
        </NavLink>
        <NavLink
          to='/react-quill'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          react-quill
        </NavLink>
        <NavLink
          to='/user-modify'
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? 'bold' : 'normal',
            };
          }}
        >
          user-modify
        </NavLink>
      </Flex>
      <Flex flex='1' vertical align='center'>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<DynamicForm />} />
          <Route path='/about' element={<TestForm />} />
          <Route path='/websocket' element={<WebSocket />} />
          <Route path='/tag-input' element={<TagInput />} />
          <Route path='/lexical' element={<Lexical />} />
          <Route path='/react-quill' element={<MyReactQuill />} />
          <Route path='/user-modify' element={<MyTagInput />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  );
}
export default App;
