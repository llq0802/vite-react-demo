// components/ChongqingTerrainMap.jsx
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import chongqingGeoJson from './cq.json';
import chongqingMainGeoJson from './cq_main.json';

// --- 重庆 GeoJSON 数据 ---

// 注册重庆市地图
echarts.registerMap('cq', {
  geoJSON: chongqingGeoJson as unknown as string,
  specialAreas: {},
});
echarts.registerMap('cq_main', {
  geoJSON: chongqingMainGeoJson as unknown as string,
  specialAreas: {},
});

const ChongqingTerrainMap = () => {
  const cqChartRef = useRef(null);
  const cqMainChartRef = useRef(null);
  const cqMainOption = {
    geo: [
      {
        map: 'cq_main',
      },
    ],
  };
  const cqOption = {
    geo: [
      {
        map: 'cq',
      },
    ],
  };

  return (
    <div className="flex h-full w-full flex-col bg-gray-800">
      <ReactECharts ref={cqMainChartRef} option={cqMainOption} style={{ height: '35%', width: '100%' }} />
      <ReactECharts ref={cqChartRef} option={cqOption} style={{ height: '65%', width: '100%' }} />
    </div>
  );
};

export default ChongqingTerrainMap;
