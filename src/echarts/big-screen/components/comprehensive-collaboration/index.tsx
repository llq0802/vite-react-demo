import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import styles from './index.less';
import {
  apiGetComprehensiveCollaborationGas,
  apiGetComprehensiveCollaborationWaste,
  apiGetComprehensiveCollaborationWater,
} from './service';
import AutoScrollHorizontal from './auto-srcroll-horizontal';
export interface ComprehensiveCollaborationItem {
  name: string;
  distributed: number;
  processing: number;
}
const ComprehensiveCollaboration = () => {
  // const { data = [] } = useMockFileData<Array<ComprehensiveCollaborationItem>>({
  //   fileName: 'comprehensive-collaboration',
  // });
  // 多跨协同数据查询
  const { data: dataWater = { code: '', data: [] } } = useRequest(
    apiGetComprehensiveCollaborationWater,
    {
      onSuccess: (result) => {
        console.log('多跨协同水数据加载异常:', result);
      },
    },
  );

  const { data: dataGas = { code: '', data: [] } } = useRequest(
    apiGetComprehensiveCollaborationGas,
    {
      onSuccess: (result) => {
        console.log('多跨协同气数据加载异常:', result);
      },
    },
  );

  const { data: dataWaste = { code: '', data: [] } } = useRequest(
    apiGetComprehensiveCollaborationWaste,
    {
      onSuccess: (result) => {
        console.log('多跨协同废数据加载异常:', result);
      },
    },
  );

  const data = useMemo(() => {
    return [...dataWater.data, ...dataGas.data, ...dataWaste?.data];
  }, [dataWater, dataGas, dataWaste]);

  return (
    <div className={styles.comprehensiveCollaboration}>
      <div className={styles.typeCard}>多跨协同</div>
      <div className={styles.dataList}>
        <div className={styles.carouselPanel}>
          <AutoScrollHorizontal
            speed={40}
            content={
              <div className={styles.panelContainer}>
                {data.map((item) => {
                  return (
                    <div key={item.name} className={styles.panelItem}>
                      <div className={styles.distributed}></div>
                      <div className={styles.rightData}>
                        <div className={styles.topData}>
                          <div className={styles.value}>{item.distributed}</div>
                          <div className={styles.split}> / </div>
                          <div className={styles.process}>{item.processing}</div>
                          <div className={styles.mark}> (已派发/处理中)</div>
                        </div>
                        <div className={styles.name}>{item.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveCollaboration;
