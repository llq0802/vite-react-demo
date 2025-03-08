import { Flex } from 'antd';
import { BrowserRouter, Router, Routes, Route, NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Flex gap={16} align='center' wrap>
        {routes.map(({ path }) => {
          return (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => {
                return {
                  display: 'grid',
                  placeItems: 'center',
                  minWidth: 100,
                  height: 40,
                  backgroundColor: isActive ? 'lightblue' : 'white',
                  padding: `0 10px`,
                };
              }}
            >
              {path}
            </NavLink>
          );
        })}
      </Flex>
      <Flex flex='1 0 0' vertical align='center' justify='center'>
        {element}
      </Flex>
    </>
  );
}
export default App;
