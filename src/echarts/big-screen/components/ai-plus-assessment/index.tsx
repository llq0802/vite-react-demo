import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import IconIndicator from '../../assets/icons/icon-indicator.svg';
import CardContainer from '../common/card-container';
import styles from './index.less';
import { apiGetIndicatorGas, apiGetIndicatorWaste, apiGetIndicatorWater } from './service';
import { formatToTwoDecimals } from '../../utils';
import AutoScroll from '../../../../components/auto-scroll';
export interface AIPlusAssessmeentResponseItem {
  value: string; // 当前值
  trend: 1 | 2; // 1 升 2 降
  name: string; // 名称
  unit: string; // 单位
  standValue: string; // 标准值
}

const AIPlusAssessmeent = () => {
  const {
    data: dataListWater = {
      code: 0,
      data: [],
    },
  } = useRequest(apiGetIndicatorWater, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('ai+关键指标水数据获取异常：', result);
    },
  });
  const {
    data: dataListGas = {
      code: 0,
      data: [],
    },
  } = useRequest(apiGetIndicatorGas, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('ai+关键指标气数据获取异常：', result);
    },
  });

  const {
    data: dataListWaste = {
      code: 0,
      data: [],
    },
  } = useRequest(apiGetIndicatorWaste, {
    onSuccess: (result) => {
      console.log('ai+关键指标废数据获取异常：', result);
    },
  });

  const dataList = useMemo(() => {
    return [
      ...(dataListGas.data || []).slice?.(0, 8), // 气 过滤掉不超标的
      ...(dataListWater.data || [])?.slice?.(0, 8),
      ...dataListWaste.data,
    ];
  }, [dataListGas, dataListWater, dataListWaste]);

  return (
    <div className={styles.aiPlusAssessmeent}>
      <CardContainer title="AI+关键指标分析" headerIcon={<img src={IconIndicator} alt="" />}>
        <div className={styles.contentBody}>
          <AutoScroll
            keyId="zhibiaofenxi"
            content={
              <div className={styles.keyAnalysis}>
                {dataList.map((item) => {
                  return (
                    <div className={styles.dataItem} key={item.name}>
                      <div className={styles.title}>{item.name}</div>
                      <div className={styles.val}>
                        {formatToTwoDecimals(item.value)}
                        {item.unit}
                        {/* {item.standValue! && (
                          <span className={styles.standValue}>
                            <span className={styles.splitLine}>/</span>{' '}
                            {formatToTwoDecimals(item.standValue)}
                            {item.unit}
                          </span>
                        )} */}
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          />
        </div>
      </CardContainer>
    </div>
  );
};

export default AIPlusAssessmeent;
