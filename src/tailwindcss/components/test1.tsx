import React from 'react';
import styles from './test1.module.css';

type PropsType = {};

const Test1: React.FC<PropsType> = ({}) => {
  return (
    <div data-component-test className={styles.container}>
      <div className="relative flex min-h-28 flex-col rounded-2xl p-4">
        <div className="flex min-h-8 items-center justify-between">header</div>
        <div className="flex-1 basis-0 truncate bg-[#dd4d35]/10 font-bold text-amber-200">body</div>
        <div className="flex justify-end bg-(--custom-color)">footer</div>
      </div>
    </div>
  );
};

export default Test1;
