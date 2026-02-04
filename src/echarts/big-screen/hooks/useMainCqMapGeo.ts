import MainCqJSON from '@/assets/json/main_cq_geojson.json';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

/**
 * 重庆主城地图svg静态资源地址
 */
// export const MainQcMapSvgUrl = `/static-resource/main_cq_map_3.svg`;
export const MainQcMapSvgUrl = `/static-resource/main_cq_map.svg`;

export const mapSvgKey = 'main_cq_map';
export const mapJsonKey = 'main_cq_json_map';

const getGeoConfig = (
  { geoSvgConfig, geoJsonConfig }: GeoConfig = {
    geoSvgConfig: {},
    geoJsonConfig: {},
  },
) => {
  return [
    // {
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   map: mapSvgKey,
    //   itemStyle: {
    //     borderWidth: 0,
    //   },
    //   id: mapSvgKey,
    //   tooltip: {
    //     show: false,
    //   },
    //   emphasis: {
    //     focus: 'none',
    //     show: false,
    //     itemStyle: {
    //       areaColor: '#ffffff',
    //       width: '10',
    //     },
    //     label: {
    //       show: false,
    //     },
    //   },
    //   label: {
    //     show: false,
    //   },
    //   ...geoSvgConfig,
    // },
    {
      show: true,
      left: '25%',
      right: '8.5%',
      bottom: '8%',
      top: '9%',
      map: mapJsonKey,
      tooltip: {
        show: false,
      },
      label: {
        show: false,
      },
      itemStyle: {
        color: 'rgba(113, 181, 70, 0.28)',
        borderColor: '#AADBAF',
        borderWidth: 0.5,
      },
      emphasis: {
        focus: 'none',
        show: false,
        itemStyle: {
          areaColor: '#7DD864',
        },
        label: {
          show: true,
          color: '#ffffff',
        },
      },
      select: {
        disabled: false,
        show: false,
        label: {
          show: false,
        },
      },
      roam: false,
      ...geoJsonConfig,
    },
  ];
};
type Result = {
  geo: { [key: string]: any }[];
  mapSvgKey: string;
  mapJsonKey: string;
};

type GeoConfig = {
  geoSvgConfig?: { [key: string]: any } | undefined;
  geoJsonConfig?: { [key: string]: any } | undefined;
};

/**
 * 获取重庆主城echarts地图 geo 配置项
 * @returns [geo] echarts地图 geo 配置项
 */
const useMainCqMapGeo = (geoConfig?: GeoConfig, mpSvgUrl?: any): Result => {
  const [geo, setGeo] = useState<{ [key: string]: any }[]>([]); // 坐标系

  /**
   * 注册地图，并定义地图的geo 和 series
   */
  useEffect(() => {
    const geoJSON: any = MainCqJSON;

    // 注册GeoJSON地图
    echarts.registerMap(mapJsonKey, { geoJSON, specialAreas: {} });
    // echarts.registerMap(mapSvgKey, { svg: CqMainMapSvgData });
    setGeo(getGeoConfig(geoConfig));
  }, []);

  return { geo, mapJsonKey, mapSvgKey };
};

export default useMainCqMapGeo;
