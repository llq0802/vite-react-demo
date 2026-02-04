import { Fragment } from 'react/jsx-runtime';
import useMockFileData from '../../hooks/useMockFileData';
import styles from './index.less';
interface DataItem {
  name: string;
  data: number;
  unit?: string;
}
const TopData = () => {
  const {
    data = {
      protectList: [],
      monitorDataList: [],
    },
  } = useMockFileData<{ protectList: Array<DataItem>; monitorDataList: Array<DataItem> }>({
    fileName: 'tongjishuju',
  });

  return (
    <div className={styles.topData}>
      <div className={styles.protect}>
        <div className={styles.typeCard}>保护对象</div>
        <div className={styles.protectDataList}>
          {data.protectList?.map((item) => {
            return (
              <Fragment key={item.name}>
                <div className={styles.splitLine}></div>
                <div className={styles.dataItem}>
                  <div className={styles.typeName}>{item.name}</div>
                  <div className={styles.value}>
                    {item.data}
                    <span className={styles.unit}>{item.unit}</span>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className={styles.monitor}>
        <div className={styles.typeCard}>监管对象</div>
        <div className={styles.monitorDataList}>
          <div className={styles.dataList}>
            {data?.monitorDataList.map((item, index) => {
              return (
                <div
                  className={`${styles.dataItem} ${index === data.monitorDataList.length - 1 && styles.noborder}`}
                  key={item.name}
                >
                  <div className={styles.mount}>
                    {item.data}
                    <span className={styles.unit}>个</span>
                  </div>
                  <div className={styles.name}>{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopData;
