import { NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-2 bg-blue-400/10 p-3">
        {routes.map(({ path }) => {
          return (
            <NavLink
              key={path!}
              to={path!}
              className={({ isActive }) => {
                const active = isActive ? 'bg-pink-300 text-white' : '';
                return `center w-fit min-w-30 rounded-2xl px-4 py-2 ${active}`;
              }}
            >
              {path}
            </NavLink>
          );
        })}
      </div>
      <div className="h-0 min-h-0 flex-1 overflow-y-auto bg-gray-300/50 p-6">{element}</div>
    </>
  );
}
export default App;
