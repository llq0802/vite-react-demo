import { Fragment } from 'react/jsx-runtime';
import styles from './index.less';
const HazardousWaste = () => {
  const datas = [
    { title: '危废产生', count: 12321, mount: 31232 },
    { title: '危废运输', count: 12321, mount: 31232 },
    { title: '危废处置', count: 12321, mount: 31232 },
  ];
  return (
    <div className={styles.hazardousWaste}>
      {datas.map((item) => {
        return (
          <Fragment key={item.title}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.count}>
              {item.count}
              <span className={styles.unit}>家 /</span> {item.mount}
              <span className={styles.unit}>万吨</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default HazardousWaste;
