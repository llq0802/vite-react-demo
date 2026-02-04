// import mapWarningIcon from '@/assets/imgs/home/issue_icon.svg';
import tooltipBg from '@/assets/imgs/home/tooltip_bg.png';
import { useRequest } from 'ahooks';
import { useMemo, useState } from 'react';
import { CqCityNameMap, CqMainCityNameMap } from '../../data';
import { getDynamicSymbolConfig } from './DynamicWarningIcon';
import { apiGetMapAirIssues, apiGetMapLandIssues, apiGetMapWaterIssues } from './service';

interface CqMapData {
  /** 主城、全重庆问题点位option */
  issueEchartsOptions: any[];
  /** 全市问题数 */
  cityTotal: number;
}

/**
 * 问题点位数据
 */
interface IssueItem {
  /**
   * 区域名称
   */
  district: string;
  /**
   * 问题数
   */
  num: number;
}

const getIssueOption = (data: any[]) => ({
  name: '问题',
  type: 'scatter',
  coordinateSystem: 'geo',
  geoIndex: 0,
  silent: false, // 允许响应事件
  // z: 10, // 提高层级
  encode: {
    value: 2,
  },
  itemStyle: {
    opacity: 1,
  },
  data: data.map((item) => {
    const config = getDynamicSymbolConfig(item.name, item.value[2]);
    return {
      ...item,
      ...config,
    };
  }),
  tooltip: {
    show: true,
    // trigger: 'item',
    // triggerOn: 'mousemove|click',
    // enterable: true,
    // confine: true,
    // alwaysShowContent: false,
    // hideDelay: 100,
    position: 'top',
    z: 10,
    formatter: (params: any) => {
      const areaName = params.data.value[3];
      const num = params.data.value[2];
      return `<div style="background-image: url(${tooltipBg});
                         background-size: 100% 100%;
                         background-repeat: no-repeat;
                         padding: 5px 10px 13px;
                         color: white;
                         display: flex;
                         align-items: center;
                         justify-content: space-between;
                         min-width: 120px;
                         min-height: 40px;">
                    <div style="background: #49ECFF; box-shadow: 0 0 20px 0 #8FF3FF;width: 5px;margin-right: 4px;height: 14px;"></div>
                    <div style="font-size: 14px;font-weight: 600;color: #FFF;flex: 1;margin-right: 12px;">${areaName}问题数</div>
                    <div style="display: flex; align-items: flex-end;">
                        <div style="font-size: 20px;font-weight: 600;color: #FFC97A;text-shadow: 0 1.2px 1.2px rgba(30, 116, 223, 0.80);font-weight: 700;line-height: 28px;">
                          ${num}
                        </div>
                        <div style="font-size: 12px;color: #FFF;">个</div>
                    </div>
              </div>`;
    },
    backgroundColor: 'transparent',
    borderWidth: 0,
    textStyle: {
      color: 'white',
    },
    extraCssText: 'box-shadow: none; padding: 0;',
  },
  emphasis: {
    label: {
      show: false,
    },
    scale: 1.3, // hover时放大效果
    // itemStyle: {
    //   shadowBlur: 10,
    //   shadowColor: 'rgba(255, 201, 122, 0.5)',
    // },
  },
  label: {
    show: false,
    position: 'top',
    formatter: '{b}',
    emphasis: {
      show: false,
    },
  },
});

/**
 * @description: 获取地图数据
 * @return {*}  CqMapData
 * @example:
 *  const { areaData, siteData } = useCqMapData();
 */
const useCqMapData = (): CqMapData => {
  // 全市总问题数量
  const [cityTotal, setCityTotal] = useState(0);

  // 水环境问题点位数据
  // const { data: waterRes } = useRequest(apiGetMapWaterIssues, {
  //   onSuccess: (result) => {
  //     console.log('Water issues loaded:', result);
  //   },
  // });

  // 气问题列表
  const { data: airRes } = useRequest(apiGetMapAirIssues, {
    onSuccess: (result) => {
      console.log('Air issues loaded:', result);
    },
  });

  // 废问题列表
  const { data: landRes } = useRequest(apiGetMapLandIssues, {
    onSuccess: (result) => {
      console.log('Land issues loaded:', result);
    },
  });

  const issueEchartsOptions = useMemo(() => {
    if (
      // (waterRes?.code === 200 || waterRes?.code === 0) &&
      (airRes?.code === 200 || airRes?.code === 0) &&
      (landRes?.code === 200 || landRes?.code === 0)
    ) {
      // 主城数据series 数据
      const mainData: any[] = [];
      // 全重庆数据series 数据
      const cqData: any[] = [];
      // 主城问题数统计
      const mainCityNumCount: any = {};
      // 全重庆问题数统计
      const cqCityNumCount: any = {};
      // 全市问题数统计
      const allCityNumCount = (airRes?.data?.total || 0) + (landRes?.data?.total || 0);
      // 重庆主城区聚合
      let cqMainCityCount = 0;

      // waterRes.data.districtData.forEach((item) => {
      //   if (item.num) {
      //     if (CqMainCityNameMap[item.district]) {
      //       // 主城
      //       mainCityNumCount[item.district] = (mainCityNumCount[item.district] || 0) + item.num;
      //       cqMainCityCount += item.num;
      //     } else {
      //       // 全重庆
      //       cqCityNumCount[item.district] = (cqCityNumCount[item.district] || 0) + item.num;
      //     }
      //     // allCityNumCount += item.num;
      //   }
      // });

      airRes.data.districtData.forEach((item) => {
        if (item.num) {
          if (CqMainCityNameMap[item.district]) {
            // 主城
            mainCityNumCount[item.district] = (mainCityNumCount[item.district] || 0) + item.num;
            cqMainCityCount += item.num;
          } else {
            // 全重庆
            cqCityNumCount[item.district] = (cqCityNumCount[item.district] || 0) + item.num;
          }
          // allCityNumCount += item.num;
        }
      });

      landRes.data.districtData.forEach((item) => {
        if (item.num) {
          if (CqMainCityNameMap[item.district]) {
            // 主城
            mainCityNumCount[item.district] = (mainCityNumCount[item.district] || 0) + item.num;
            cqMainCityCount += item.num;
          } else {
            // 全重庆
            cqCityNumCount[item.district] = (cqCityNumCount[item.district] || 0) + item.num;
          }
          // allCityNumCount += item.num;
        }
      });

      Object.keys(cqCityNumCount).forEach((key) => {
        if (CqCityNameMap[key]) {
          cqData.push({
            name: key,
            value: [CqCityNameMap[key].lng, CqCityNameMap[key].lat, cqCityNumCount[key], key],
          });
        } else {
          console.warn(`${key} 不在重庆区县列表中`);
        }
      });
      cqData.push({
        name: '重庆主城区',
        value: [
          CqCityNameMap['重庆主城区'].lng,
          CqCityNameMap['重庆主城区'].lat,
          cqMainCityCount,
          '重庆主城区',
        ],
      });

      Object.keys(mainCityNumCount).forEach((key) => {
        if (CqMainCityNameMap[key]) {
          mainData.push({
            name: key,
            value: [
              CqMainCityNameMap[key].lng,
              CqMainCityNameMap[key].lat,
              mainCityNumCount[key],
              key,
            ],
          });
        } else {
          console.warn(`${key} 不在重庆主城区列表中`);
        }
      });
      setCityTotal(allCityNumCount);

      return [getIssueOption(mainData), getIssueOption(cqData)];
    } else {
      console.warn('获取地图数据失败');
      return [];
    }
  }, [airRes, landRes]);

  return {
    issueEchartsOptions,
    cityTotal,
  };
};

export default useCqMapData;
