import { Fragment } from 'react/jsx-runtime';
import styles from './index.less';
const WaterQuality = () => {
  const realtimeData = [
    { time: '02', scale: '90', qualified: 30, noData: 3 },
    { time: '03', scale: '70', qualified: 30, noData: 3 },
    { time: '04', scale: '82', qualified: 30, noData: 3 },
  ];
  const dataList = [
    { title: '共预测河流', count: 30 },
    { title: '共预测断面', count: 30 },
    { title: '未预测断面', count: 30 },
    { title: '预测超标河流', count: 30 },
    { title: '预测超标断面', count: 30 },
  ];
  return (
    <div className={styles.waterQuality}>
      <div className={styles.title}>实时水质监测</div>
      <div className={styles.qualityItems}>
        {realtimeData.map((item) => {
          return (
            <div key={item.time} className={styles.qualityItem}>
              <div className={styles.time}>{item.time}点</div>
              <div className={styles.processBar}>
                <div className={styles.processBarBg}>
                  <div className={styles.processBarValue} style={{ width: `${item.scale}%` }}></div>
                </div>
                <div className={styles.processValue}>{item.scale}%</div>
              </div>
              <div className={styles.counts}>
                <div className={`${styles.realTimeData} ${styles.br}`}>
                  <div className={styles.notOk}>不达标</div>
                  <div className={styles.mount}>{item.qualified}</div>
                </div>
                <div className={styles.realTimeData}>
                  <div className={styles.noData}>无数据</div>
                  <div className={styles.mount}>{item.noData}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.title}>预测预报</div>
      <div className={styles.forecast}>
        <div className={styles.leftLayout}>
          <div className={styles.count}>
            100<span className={styles.unit}>条</span>
          </div>
          <div className={styles.typeText}>国控断面</div>
        </div>
        <div className={styles.rightLayout}>
          {dataList.map((item, index) => {
            return (
              <Fragment key={item.title}>
                <div className={`${styles.item} ${index === 2 && styles.noborder}`}>
                  <div className={styles.count}>
                    {item.count}
                    <span className={styles.unit}>条</span>
                  </div>
                  <div className={styles.typeText}>{item.title}</div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;
