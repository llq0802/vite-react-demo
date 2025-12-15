import { NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <div className="relative grid min-h-screen grid-flow-row grid-cols-1 grid-rows-[auto_minmax(0,1fr)]">
      <div className="flex flex-wrap gap-x-4 gap-y-2 bg-blue-400/10 p-3">
        {routes.map(({ path }) => {
          return (
            <NavLink
              key={path!}
              to={path!}
              className={({ isActive }) => {
                const activeClass = isActive ? 'bg-pink-300 text-white' : '';
                return `center w-fit min-w-30 rounded-2xl px-4 py-2 ${activeClass}`;
              }}
            >
              {path}
            </NavLink>
          );
        })}
      </div>
      <div className="overflow-y-auto bg-gray-300/50 p-6">{element}</div>
    </div>
  );
}
export default App;
