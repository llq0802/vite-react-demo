import CqJSON from '@/assets/json/cq.json';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

/**
 * 重庆地图svg静态资源地址
 */
// export const CqMapSvgUrl = `/static-resource/main_3.svg`;
export const CqMapSvgUrl = `/static-resource/cq_map.svg`;

const mapSvgKey = 'cq_svg_map';
const mapJsonKey = 'cq_json_map';

type GeoConfig = {
  geoSvgConfig?: { [key: string]: any } | undefined;
  geoJsonConfig?: { [key: string]: any } | undefined;
};

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
    //   select: {
    //     disabled: false,
    //     label: {
    //       show: false,
    //     },
    //   },
    //   emphasis: {
    //     disabled: false,
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
    //   ...geoSvgConfig,
    // },
    {
      show: true,
      left: '0',
      right: '0',
      bottom: '0',
      top: '4%',
      map: mapJsonKey,
      // aspectScale: 1.4,
      // zoom: 1.2,
      tooltip: {
        show: false,
      },
      label: {
        show: false,
      },
      select: {
        disabled: false,
        show: false,
        label: {
          show: false,
        },
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

type UseCqMapGeoParams = {
  geoConfig?: GeoConfig;
};

/**
 * 获取重庆echarts地图配置项，包含 geo
 * @returns {mapKey,geo,series} echarts地图 geo
 */
const useCqMapGeo = (params?: UseCqMapGeoParams): Result => {
  const { geoConfig } = params || {};
  const [geo, setGeo] = useState<{ [key: string]: any }[]>([]); // 坐标系

  /**
   * 注册地图，并定义地图的geo 和 series
   */
  useEffect(() => {
    const geoJSON: any = CqJSON;
    echarts.registerMap(mapJsonKey, { geoJSON, specialAreas: {} });
    setGeo(getGeoConfig(geoConfig));

    // const geoJSON: any = CqJSON;
    // echarts.registerMap(mapJsonKey, { geoJSON, specialAreas: {} });
    // // echarts.registerMap(mapSvgKey, { svg: CqMapSvgData });
    // setGeo(getGeoConfig(geoConfig, mapBgRef));
    // const fetchaMapSvg = async () => {
    //   try {
    //     const response = await fetch(mpSvgUrl || CqMapSvgUrl);
    //     if (response.status === 200) {
    //       const svg = await response.text();

    //       echarts.registerMap(mapSvgKey, { svg });
    //       setGeo(getGeoConfig(geoConfig));
    //     } else {
    //       message.error('未获取到地图资源');
    //     }
    //   } catch (e) {
    //     console.log('error', e);
    //   }
    // };
    // fetchaMapSvg();
  }, []);

  return { geo, mapJsonKey, mapSvgKey };
};

export default useCqMapGeo;
