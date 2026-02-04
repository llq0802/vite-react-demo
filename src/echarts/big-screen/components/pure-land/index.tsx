import { useRequest } from 'ahooks';
import pureLandIcon from '../../assets/icons/icon-land.svg';
import CardContainer from '../common/card-container';
import styles from './index.less';
import { apiGetPureLand } from './service';
import { formatToTwoDecimals } from '../../utils';
interface PureLandItem {
  /**
   * 目标值
   */
  targetValue: string;
  /**
   * 实际值
   */
  actualValue: string;
  /**
   * 状态
   */
  status: string;
}
export type ResultItem = {
  proportion: PureLandItem;
  regulatoryRate: PureLandItem;
  completionRate: PureLandItem;
};
const PureLand = () => {
  // const {
  //   data = {
  //     proportion: { targetValue: '', actualValue: '', status: '' },
  //     regulatoryRate: { targetValue: '', actualValue: '', status: '' },
  //     completionRate: { targetValue: '', actualValue: '', status: '' },
  //   },
  // } = useMockFileData<ResultItem>({ fileName: 'jingtubaoweizhan' });
  const {
    data = {
      code: '',
      data: {
        proportion: { targetValue: '', actualValue: '', status: '' },
        regulatoryRate: { targetValue: '', actualValue: '', status: '' },
        completionRate: { targetValue: '', actualValue: '', status: '' },
      },
    },
  } = useRequest(apiGetPureLand, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('Water issues loaded:', result);
    },
  });
  const types: Array<{ type: string; key: 'proportion' | 'regulatoryRate' | 'completionRate' }> = [
    { type: '危险废物填埋处置占比', key: 'proportion' },
    { type: '重点管控新污染物生产使用企业重点监管率', key: 'regulatoryRate' },
    { type: '重金属减排任务完成率', key: 'completionRate' },
  ];
  return (
    <div className={styles.pureLand}>
      <CardContainer title="净土保卫战" headerIcon={<img src={pureLandIcon} alt="" />}>
        <div className={styles.container}>
          {types.map((item) => {
            const value = data.data[item.key];
            return (
              <div className={styles.row} key={item.type}>
                <div className={styles.typeName}>{item.type}</div>
                <div className={styles.values}>
                  <div className={styles.target}>
                    目标值:
                    <span className={styles.value}>{formatToTwoDecimals(value?.targetValue)}</span>
                    <span className={styles.unit}>%</span>
                  </div>
                  <div
                    className={styles.actual}
                    style={{ color: value?.status === '已达标' ? '#16f7b3' : '#ff5051' }}
                  >
                    实际值:
                    <span className={styles.value}>{formatToTwoDecimals(value?.actualValue)}</span>
                    <span className={styles.unit}>%</span>
                  </div>
                  <div
                    className={styles.status}
                    style={{ color: value?.status === '已达标' ? '#16f7b3' : '#ffd527' }}
                  >
                    {value?.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <Row className={styles.row}>
          {data.map((item, index) => {
            return (
              <Col span={12} key={item.title} className={styles.col}>
                <div className={`${styles.item} ${index < 4 && styles.border}`}>
                  <div className={styles.mount}>
                    {item.count}
                    <span className={styles.unit}>{item.unit}</span>
                  </div>
                  <div className={styles.type}>{item.title}</div>
                </div>
              </Col>
            );
          })}
        </Row> */}
      </CardContainer>
    </div>
  );
};

export default PureLand;
