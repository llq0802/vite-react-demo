import { cn } from '../utils';
import styles from './index.module.css';

const Tailwindcss = () => {
  const itemClass = `h-50 flex-center border bg-sky-300 content-auto font-bold`;
  return (
    <div
    className={cn(styles.container)}

    >
      <div className="flex items-center justify-center gap-2">
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

      <div className="flex-[1_1_0] min-h-0 h-0 grid! content-start grid-cols-2 gap-2 sm:grid-cols-3 overflow-y-auto relative">
        {new Array(50).fill(0).map((_, i) => (
          <div key={i} className={cn(itemClass)}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tailwindcss;
