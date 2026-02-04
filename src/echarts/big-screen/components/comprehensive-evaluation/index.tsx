import { useRequest } from 'ahooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IconEvaluate from '../../assets/icons/icon-evaluate.svg';
import { getGasToken } from '../../utils';
import CardContainer from '../common/card-container';
import DownloadIcon from './assets/download.svg';
import styles from './index.less';
import {
  apiDownloadWaterDay,
  apiDownloadWaterMonth,
  apiGetEvaluationGas,
  apiGetEvaluationWaste,
  apiGetEvaluationWaterDay,
  apiGetEvaluationWaterMonth,
} from './service';
import { BASE_URL } from '@/config';
import AutoScroll from '@/components/auto-scroll';
export enum TAB_TYPE {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
}

enum KEY_TYPE {
  TOTAL = 'total',
  WATER = 'water',
  GAS = 'gas',
  WASTE = 'waste',
}

const ComprehensiveEvaluation = () => {
  const [showType, setShowType] = useState<TAB_TYPE>(TAB_TYPE.DAY); // 这个值改了要重新请求下数据
  const [keyType, setKeyType] = useState<KEY_TYPE>(KEY_TYPE.TOTAL);
  const {
    data: waterDataDay = {
      code: 0,
      data: '',
      msg: '',
    },
  } = useRequest(apiGetEvaluationWaterDay, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('ai+综合评估水日数据获取异常：', result);
    },
  });

  const {
    data: waterDataMonth = {
      code: 0,
      data: '',
      msg: '',
    },
  } = useRequest(apiGetEvaluationWaterMonth, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('ai+综合评估水月数据获取异常：', result);
    },
  });

  const {
    data: gasData = {
      code: 0,
      data: '',
    },
  } = useRequest(apiGetEvaluationGas, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('ai+综合评估气数据获取异常：', result);
    },
  });

  const {
    data: wasteData = {
      code: 0,
      data: '',
    },
  } = useRequest(apiGetEvaluationWaste, {
    onSuccess: (result) => {
      console.log('ai+综合评估废数据获取异常：', result);
    },
  });

  const tabTypes: Array<{ key: TAB_TYPE; title: string }> = useMemo(() => {
    if (keyType === KEY_TYPE.GAS) {
      return [
        { key: TAB_TYPE.DAY, title: '日' },
        { key: TAB_TYPE.WEEK, title: '周' },
        { key: TAB_TYPE.MONTH, title: '年' },
      ];
    } else if (keyType === KEY_TYPE.WASTE) {
      return [];
    } else if (keyType === KEY_TYPE.WATER) {
      return [
        { key: TAB_TYPE.DAY, title: '日' },
        { key: TAB_TYPE.MONTH, title: '月' },
      ];
    } else {
      return [];
    }
  }, [keyType]);
  const keyTypes: Array<{ key: KEY_TYPE; title: string }> = [
    { key: KEY_TYPE.TOTAL, title: '总' },
    { key: KEY_TYPE.WATER, title: '水' },
    { key: KEY_TYPE.GAS, title: '气' },
    { key: KEY_TYPE.WASTE, title: '废' },
  ];

  const downloadGas = () => {
    window.open(
      `${BASE_URL}/gas/prod-api/cockpit/aimanagnmentqx/generateKongQiZhiLiangMeiRiJianBaoForDianXin?token=${getGasToken()}`,
    );
  };

  const dataList = useMemo(() => {
    const gasDatas = gasData?.data?.split('\n') || ['', '', ''];
    // if (gasData.data) {
    //   return gasData.data.split('\n')?.[showType - 1];
    // }
    const dataMap: Record<string, Array<string>> = {
      // 水-日
      'water-1': [waterDataDay?.msg],
      // 水-月
      'water-3': [waterDataMonth?.msg],
      // 气-日
      'gas-1': [gasDatas[0]],
      // 气-周
      'gas-2': [gasDatas[1]],
      // 气-月
      'gas-3': [gasDatas[2]],
      // 废
      'waste-1': [wasteData?.data],
    };
    return dataMap[`${keyType}-${showType}`] || [waterDataDay?.msg, gasDatas[1], wasteData?.data];
    // return [
    //   { ...waterData, data: waterData.msg, type: KEY_TYPE.WATER },
    //   { data: gasDatas, type: KEY_TYPE.GAS },
    //   { ...wasteData, type: KEY_TYPE.WASTE },
    // ];
  }, [gasData, waterDataDay, waterDataMonth, wasteData, keyType, showType]);

  const downloadMethodMap: Record<string, () => void> = {
    // 水-日
    'water-1': () => {
      apiDownloadWaterDay().then((res) => {
        if (res?.msg) {
          window.open(res.msg);
        }
      });
    },
    // 水-月
    'water-3': () => {
      apiDownloadWaterMonth().then((res) => {
        if (res?.msg) {
          window.open(res.msg);
        }
      });
    },
    'gas-1': () => {
      downloadGas();
    },
    'gas-2': () => {
      downloadGas();
    },
    'gas-3': () => {
      downloadGas();
    },
  };

  const handleDownload = useCallback(() => {
    downloadMethodMap[`${keyType}-${showType}`]?.();
  }, [showType, keyType]);

  return (
    <div className={styles.comprehensiveEvaluation}>
      <CardContainer
        headerIcon={<img src={IconEvaluate} alt="" />}
        title="AI+综合评估"
        headerRight={
          <div className={styles.typeList}>
            {keyTypes.map((item) => {
              return (
                <div
                  className={`${styles.typeItem} ${item.key === keyType && styles.active}`}
                  key={item.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowType(TAB_TYPE.DAY);
                    setKeyType(item.key);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        }
      >
        <div className={styles.contanier}>
          <div className={styles.blueTypeList}>
            {tabTypes.map((item) => {
              return (
                <div
                  className={`${styles.typeItem} ${item.key === showType && styles.active}`}
                  key={item.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowType(item.key);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className={styles.evaluation}>
            <AutoScroll
              content={
                <>
                  {dataList.map((item, index) => {
                    return (
                      <div className={styles.autoWrap} key={index}>
                        {item}
                      </div>
                    );
                  })}
                </>
              }
            />
          </div>
          {[KEY_TYPE.WATER, KEY_TYPE.GAS].includes(keyType) && (
            <div className={styles.bottom}>
              <img
                src={DownloadIcon}
                alt=""
                className={styles.downloadBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
              />
            </div>
          )}
        </div>
      </CardContainer>
    </div>
  );
};

export default ComprehensiveEvaluation;
