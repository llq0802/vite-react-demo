import { NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-wrap gap-x-4 gap-y-2 bg-blue-400/10 p-3">
        {routes.map(({ path }) => {
          return (
            <NavLink
              key={path!}
              to={path!}
              className={({ isActive }) => {
                const activeClass = isActive ? 'bg-pink-300 text-white' : '';
                return `flex-center w-fit min-w-30 rounded-2xl px-4 py-2 ${activeClass}`;
              }}
            >
              {path}
            </NavLink>
          );
        })}
      </div>
      <div className="relative overflow-y-auto bg-gray-300/80 p-6 flex-[1_1_0] h-0">{element}</div>
    </div>
  );
}
export default App;
