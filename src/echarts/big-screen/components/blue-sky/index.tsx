import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import { useMemo } from 'react';
import leafIcon from '../../assets/icons/icon-leaf.svg';
import CardContainer from '../common/card-container';
import styles from './index.less';
import { apiGetBlueSky } from './service';
import { formatToTwoDecimals } from '../../utils';

enum DataColor {
  /**
   * 合格
   */
  QUALIFIED = '#16f7b3',
  /**
   * 正常
   */
  NORMAL = '#3dffff',
  /**
   * 异常
   */
  ABNORMAL = '#ff5051',
}
interface BlueSkyTemplate {
  /**
   * 标题类型
   */
  title: string;
  /**
   * 实际值(对应接口返回的key)
   */
  countA: string | number;
  /**
   * 计划值(对应接口返回的key)
   */
  countB?: string | number;
  /**
   * 数据单位
   */
  unit: string;
  /**
   * 数据颜色
   */
  color?: DataColor;
}

export interface BlueSkyData {
  youliangday_mubiao: number; // 优良天数彪彪
  youliangday: number; // 优良天数
  pm25avg: string; // pm2.5平均值
  zhongwurantian: number; // 重度污染天数
  wanchenglv: string; // 年度目标完成率
  hour_pm25: number; // pm25实时浓度
  wtxhl: number; // 问题整改率
  pm25avg_mubiao: number; // pm2.5目标浓度
  zhongwurantian_mubiao: number; // 重度污染天数目标值
}

const BlueSky = () => {
  const {
    data = {
      code: 0,
      data: {
        youliangday_mubiao: 0,
        youliangday: 0,
        pm25avg: '0',
        zhongwurantian: 0,
        wanchenglv: '0%',
        pm25avg_mubiao: 0,
        wtxhl: 0,
        hour_pm25: 0,
        zhongwurantian_mubiao: 0,
      },
    },
  } = useRequest(apiGetBlueSky, {
    // 开启轮询
    pollingInterval: 300000, // 轮询间隔时间，单位：毫秒（这里设置为 5分钟）

    // 可选配置
    pollingWhenHidden: false, // 页面隐藏时是否继续轮询（默认 false）
    pollingErrorRetryCount: 3, // 轮询失败后重试次数（默认 3 次）
    onSuccess: (result) => {
      console.log('Water issues loaded:', result);
    },
  });
  const dataTemplate: Array<BlueSkyTemplate> = useMemo(() => {
    const blueSkyData: BlueSkyData = data.data;
    return [
      {
        title: '累积PM₂.₅平均浓度',
        countA: formatToTwoDecimals(blueSkyData.pm25avg),
        countB: formatToTwoDecimals(blueSkyData.pm25avg_mubiao),
        unit: 'μg/m³',
        color:
          parseFloat(blueSkyData.pm25avg) > blueSkyData.pm25avg_mubiao
            ? DataColor.ABNORMAL
            : DataColor.QUALIFIED,
      },
      {
        title: 'PM₂.₅实时浓度',
        countA: formatToTwoDecimals(blueSkyData.hour_pm25),
        unit: 'μg/m³',
        color: DataColor.NORMAL,
      },
      {
        title: '优良天数',
        countA: blueSkyData.youliangday,
        countB: blueSkyData.youliangday_mubiao,
        unit: '天',
        color:
          blueSkyData.youliangday < blueSkyData.youliangday_mubiao
            ? DataColor.ABNORMAL
            : DataColor.QUALIFIED,
      },
      {
        title: '重度污染天数',
        countA: blueSkyData.zhongwurantian,
        countB: blueSkyData.zhongwurantian_mubiao,
        unit: '天',
        color:
          blueSkyData.zhongwurantian > blueSkyData.zhongwurantian_mubiao
            ? DataColor.ABNORMAL
            : DataColor.QUALIFIED,
      },
      {
        title: '年度目标任务完成率',
        countA: formatToTwoDecimals(String(blueSkyData.wanchenglv)?.replace('%', '')),
        unit: '%',
        color: DataColor.NORMAL,
      },
      {
        title: '问题整改率',
        countA: formatToTwoDecimals(blueSkyData.wtxhl),
        unit: '%',
        color: DataColor.NORMAL,
      },
    ];
  }, [data.data]);

  return (
    <div className={styles.blueSky}>
      <CardContainer title="蓝天保卫战" headerIcon={<img src={leafIcon} alt="" />}>
        <Row className={styles.row}>
          {dataTemplate.map((item) => {
            return (
              <Col span={12} key={item.title}>
                <div className={styles.item}>
                  <div className={styles.countStais}>
                    <span className={styles.countA} style={{ color: item.color }}>
                      {item.countA}
                      <span className={styles.unit}>{item.unit}</span>
                    </span>

                    {(item.countB || item.countB === 0) && (
                      <>
                        <span> / </span>
                        <span className={styles.countB}>
                          {item.countB}
                          <span className={styles.unit}>{item.unit}</span>
                        </span>
                      </>
                    )}
                  </div>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </CardContainer>
    </div>
  );
};

export default BlueSky;
