import { cn } from '../utils';
import Test1 from './components/test1';
import styles from './index.module.css';

const Tailwindcss = () => {
  const itemClass = `h-50 flex-center border bg-sky-300 content-auto font-bold`;
  return (
    <div data-tailwindcss className={cn(styles.container)}>
      <div data-flex-layout className="flex items-center justify-center gap-2">
        <div className="bg-sky-500 p-3 hover:bg-sky-700">Save changes</div>
        <div className="flex-center h-full w-1/3 bg-sky-500 text-base font-bold text-amber-400">测试</div>

        <input
          type="text"
          spellCheck="false"
          className="h-10 w-50 rounded-[6px] bg-amber-500/20 px-2"
          placeholder="请输入"
          autoComplete="off"
          formNoValidate
        />
      </div>

      <div
        data-grid-layout
        className="relative grid! h-0 min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto border-4 border-amber-800 sm:grid-cols-3"
      >
        {new Array(5).fill(0).map((_, i) => (
          <div key={i} className={cn(itemClass)}>
            {i + 1}
          </div>
        ))}
      </div>

      <Test1 />
    </div>
  );
};

export default Tailwindcss;
