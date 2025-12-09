import { cn } from '../utils';
import styles from './index.module.css';

const Tailwindcss = () => {
  const item = `flex justify-center items-center w-full h-full border`;
  return (
    <div className={cn(styles.container, 'content-auto')}>
      <div className="flex items-center justify-center gap-2">
        <div className="bg-sky-500 p-3 hover:bg-sky-700">Save changes</div>
        <div className="center h-full w-1/2 bg-sky-500 text-base font-bold text-amber-400">测试</div>
      </div>

      <div className="grid! h-full grid-cols-2 gap-2 sm:grid-cols-3">
        <div className={cn(item)}>1</div>
        <div className={cn(item)}>2</div>
        <div className={cn(item)}>3</div>
        <div className={cn(item)}>4</div>
      </div>
    </div>
  );
};

export default Tailwindcss;
