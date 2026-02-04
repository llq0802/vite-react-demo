import IconAgent from './assets/icon-agent.png';
import IconDataMarket from './assets/icon-datamarket.png';
import IconDataSource from './assets/icon-dataresource.png';
import IconModel from './assets/icon-model.png';
import styles from './index.less';
const TotalStatistics = () => {
  const datas = [
    { key: '', title: '数据资源数', total: 14669, icon: IconDataSource },
    { key: '', title: '高质量数据集', total: 776, icon: IconDataMarket },
    { key: '', title: '智能模型', total: 75, icon: IconModel },
    { key: '', title: 'AI智能体', total: 32, icon: IconAgent },
  ];
  return (
    <div className={styles.totalStatistics}>
      {datas.map((item) => {
        return (
          <div className={styles.item} key={item.title}>
            <img src={item.icon} alt="" className={styles.icon} />
            <div className={styles.right}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.count}>{item.total}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TotalStatistics;
