import { Flex } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import WebSocket from './WebSocket';
import TagInput from './TagInput';
import Lexical from './Lexical';
import MyReactQuill from './react-quill';
import Q10 from './Q10';
// import DynamicForm from './dynamic-form';
import MyTagInput from './user-modify';
import Home from './home';
import DynamicForm from './dynamic-form';

function About() {
  return <h1>About</h1>;
}
function App() {
  return (
    <BrowserRouter>
      <Flex gap={10} justify='center'>
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
      <Flex flex='1' vertical align='center' justify='center'>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          {/* <Route path='/' element={<Q10 />} /> */}
          <Route path='/' element={<DynamicForm />} />
          <Route path='/about' element={<About />} />
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
