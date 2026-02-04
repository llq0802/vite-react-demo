import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import { useMemo } from 'react';
import iconPure from '../../../../assets/icons/icon-land.svg';
import iconLeaf from '../../../../assets/icons/icon-leaf.svg';
import iconWater from '../../../../assets/icons/icon-water.svg';
import styles from './index.less';
import { apiGetQuestionsGas, apiGetQuestionsWaste, apiGetQuestionsWater } from './service';
interface AIQuestionItem {
  /**
   * 类型
   */
  type: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 数据集
   */
  datas: Array<{ title: string; countKey: string; status?: 1 | 2; unit?: string }>;
}
const TypeList = () => {
  // const { data = [] } = useMockFileData<Array<AIQuestionItem>>({ fileName: 'aijiawentifaxian' });
  const {
    data: dataWater = {
      code: 0,
      data: { szycwts: 0, aispwts: 0, rhpwkwts: 0 },
    },
  } = useRequest(apiGetQuestionsWater, {
    onSuccess: (result) => {
      console.log('ai+问题发现水数据获取异常：', result);
    },
  });

  const {
    data: dataGas = {
      code: 0,
      data: { pm25cb: 0, ycwtfxl: 0, jgfssbs: 0 },
    },
  } = useRequest(apiGetQuestionsGas, {
    onSuccess: (result) => {
      console.log('ai+问题发现气数据获取异常：', result);
    },
  });

  const {
    data: dataWaste = {
      code: 0,
      data: { handleTotalCount: 0, sourceTotalCount: 0, transTotalCount: 0 },
    },
  } = useRequest(apiGetQuestionsWaste, {
    onSuccess: (result) => {
      console.log('ai+问题发现废数据获取异常：', result);
    },
  });

  const allData: Record<string, number> = useMemo(() => {
    return {
      ...(dataWater?.data as Record<string, number>),
      ...(dataGas?.data as Record<string, number>),
      ...(dataWaste?.data as Record<string, number>),
    };
  }, [dataGas, dataWaste, dataWater]);

  const dataTemplate: Array<AIQuestionItem> = [
    {
      type: '水',
      icon: 'water',
      datas: [
        {
          title: '水质异常问题数',
          countKey: 'szycwts',
        },
        {
          title: 'AI视频问题数',
          countKey: 'aispwts',
        },
        {
          title: '入河排污口问题数',
          countKey: 'rhpwkwts',
          status: 1,
        },
      ],
    },
    {
      type: '气',
      icon: 'gas',
      datas: [
        {
          title: 'PM₂.₅超标数',
          countKey: 'pm25cb',
        },
        {
          title: '扬尘问题数',
          countKey: 'ycwtfxl',
          // unit: '%',
          status: 2,
        },
        {
          title: '秸秆焚烧识别数',
          countKey: 'jgfssbs',
        },
      ],
    },
    {
      type: '废',
      icon: 'waste',
      datas: [
        {
          title: '源头问题',
          countKey: 'sourceTotalCount',
        },
        {
          title: '转移问题',
          countKey: 'transTotalCount',
          status: 2,
        },
        {
          title: '处置问题',
          countKey: 'handleTotalCount',
          // unit: '%',
          status: 1,
        },
      ],
    },
  ];

  /**
   * 分类图标映射
   */
  const iconMap: Record<string, any> = {
    water: iconWater,
    gas: iconLeaf,
    waste: iconPure,
  };

  return (
    <div className={styles.typeList}>
      <Row>
        {dataTemplate.map((item, index) => {
          return (
            <Col key={item.type} span={8}>
              <div className={`${styles.type} ${index === 2 && styles.noRight}`}>
                <div className={styles.icon}>
                  <img src={iconMap[item.icon]} alt="" />
                </div>
                {item.type}
              </div>
              {item.datas.map((child, cIndex) => {
                return (
                  <div
                    key={child.title}
                    className={`${styles.item} ${cIndex === 2 && styles.noBottom} ${index === 2 && styles.noRight}`}
                  >
                    <div className={styles.count}>
                      {allData[child.countKey] || 0}
                      {child.unit && <span className={styles.unit}>{child.unit}</span>}
                      {/* {child.status && (
                        <img className={styles.statusIcon} alt="" src={child.status === 1 ? arrowUp : arrowDown} />
                      )} */}
                    </div>
                    <div className={styles.title}>{child.title}</div>
                  </div>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TypeList;
