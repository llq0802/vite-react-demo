import { cn } from '../utils';
import styles from './index.module.css';
const Tailwindcss = () => {
  const item = `flex justify-center items-center w-full h-full border`;
  return (
    <div className={styles.container}>
      <div className="flex justify-center items-center gap-2">
        <div className="bg-sky-500 hover:bg-sky-700 p-3">Save changes</div>
        <div className=" w-1/2 h-full font-bold text-amber-400 text-base  bg-sky-500">测试</div>
      </div>
      <div className="h-full grid! grid-cols-2 sm:grid-cols-3 gap-2 ">
        <div className={cn(item)}>1</div>
        <div className={cn(item)}>2</div>
        <div className={cn(item)}>3</div>
        <div className={cn(item)}>4</div>
      </div>
    </div>
  );
};

export default Tailwindcss;
