import { Flex } from 'antd';
import { BrowserRouter, Router, Routes, Route, NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Flex gap={10} justify='center' align='center' wrap>
        {routes.map(({ path }) => {
          return (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => {
                return {
                  boxSizing: 'content-box',
                  display: 'grid',
                  placeItems: 'center',
                  padding: '4px 0',
                  width: 150,
                  backgroundColor: isActive ? 'lightblue' : 'white',
                  fontWeight: isActive ? 'bold' : 'normal',
                };
              }}
            >
              {path}
            </NavLink>
          );
        })}
      </Flex>
      <Flex flex='1' vertical align='center'>
        <>{element}</>
      </Flex>
    </>
  );
}
export default App;
