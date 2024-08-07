import { Flex } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import WebSocket from './WebSocket';

function Home() {
  return <h1>Home</h1>;
}

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
      </Flex>
      <Flex flex='1' vertical align='center' justify='center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/websocket' element={<WebSocket />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  );
}
export default App;
