import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import waterIcon from '../../assets/icons/icon-water.svg';
import CardContainer from '../common/card-container';
import styles from './index.less';
import { apiGetClearWater } from './service';
import { formatToTwoDecimals } from '../../utils';
export interface ClearWaterItem {
  id: number;
  /**
   * 类型
   */
  title: string;

  keyName: string;

  valueName: string;

  value1Name: string;

  type: string;

  key1?: string;
  deFlag: number;
  orderNum: number;
}
const ClearWater = () => {
  const {
    data = {
      code: '',
      data: [],
    },
  } = useRequest(apiGetClearWater, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('Water issues loaded:', result);
    },
  });
  // const { data = [] } = useMockFileData<Array<ClearWaterItem>>({ fileName: 'bishuibaoweizhan' });
  return (
    <div className={styles.clearWater}>
      <CardContainer title="碧水保卫战" headerIcon={<img src={waterIcon} alt="" />}>
        <Row className={styles.row}>
          {data?.data?.map((item) => {
            return (
              <Col span={12} key={item.title}>
                <div className={styles.item}>
                  <div className={styles.mount}>
                    {formatToTwoDecimals(item.valueName?.replace('%', ''))}
                    <span className={styles.unit}>%</span>
                    <span className={styles.targetValue}>
                      <span className={styles.split}>/</span>
                      {formatToTwoDecimals(item.value1Name?.replace('%', ''))}
                      <span className={styles.unit}>%</span>
                    </span>
                  </div>
                  <div className={styles.type}>{item.keyName}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </CardContainer>
    </div>
  );
};

export default ClearWater;
