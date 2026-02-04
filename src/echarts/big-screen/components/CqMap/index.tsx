import CqMainMapPng from '@/assets/imgs/home/cq_main_map_2.png';
import CqMapPng from '@/assets/imgs/home/cq_map_1.png';
import ReactECharts from 'echarts-for-react';
import { UseShowInstance } from 'rc-use-hooks';
import { useMemo, useRef } from 'react';
import useCqMapGeo from '../../hooks/useCqMapGeo';
import useMainCqMapGeo from '../../hooks/useMainCqMapGeo';
import IssueModal from '../issue-modal';
import styles from './styles.less';
import useCqMapData from './useCqMapData';

const baseOption = {
  tooltip: {
    show: true,
  },
  backgroundColor: 'transparent', //画布背景颜色
};

/**
 * 驾驶舱重庆地图组件
 * 包含青年在哪里、阵地在哪里
 */

const CqMap = () => {
  const { geo: mainCqGeo } = useMainCqMapGeo();
  const { geo: cqGeo } = useCqMapGeo();

  const issueModalRef = useRef<UseShowInstance>();
  const mainChartRef = useRef<ReactECharts | null>(null);
  const cqChartRef = useRef<ReactECharts | null>(null);

  const { cityTotal, issueEchartsOptions } = useCqMapData();

  /**
   * 重庆区县option渲染
   */
  const cqEchartsOption = useMemo(() => {
    if (cqGeo.length === 0) {
      return {};
    }
    let option: any = {
      ...baseOption,
      series: [],
      geo: cqGeo.map((geo) => ({
        ...geo,
        silent: false, // 允许地图区域响应事件
        emphasis: {
          itemStyle: {
            areaColor: '#FFE153',
            shadowColor: 'rgba(255, 225, 83, 0.3)',
            shadowBlur: 10,
          },
        },
      })),
    };
    if (issueEchartsOptions.length > 0) {
      option = {
        ...option,
        series: [{ ...issueEchartsOptions[1] }],
      };
    }
    return option;
  }, [issueEchartsOptions, cqGeo]);

  /**
   * 重庆主城option渲染
   */
  const mainCqEchartsOption = useMemo(() => {
    if (mainCqGeo.length === 0) {
      return {};
    }
    let option: any = {
      ...baseOption,
      series: [],
      geo: mainCqGeo.map((geo) => ({
        ...geo,
        silent: false, // 允许地图区域响应事件
        emphasis: {
          itemStyle: {
            areaColor: '#FFE153',
            shadowColor: 'rgba(255, 225, 83, 0.3)',
            shadowBlur: 10,
          },
        },
      })),
    };
    if (issueEchartsOptions.length > 0) {
      option = {
        ...option,
        series: [{ ...issueEchartsOptions[0] }],
      };
    }

    return option;
  }, [issueEchartsOptions, mainCqGeo]);

  // 智能点击事件处理
  const handleMapClick = (params: any, chartInstance: any) => {
    // 获取点击位置
    const pixel = params.event ? [params.event.offsetX, params.event.offsetY] : null;

    // 如果是symbol点击
    if (params.componentType === 'series' && params.seriesType === 'scatter') {
      if (params.data?.value && params.data.value[3]) {
        const areaName = params.data.value[3];
        issueModalRef.current?.onShow({ name: areaName });
      }
    }
    // 如果点击到地理区域但没有symbol
    else if (pixel && params.componentType === 'geo') {
      const geoContained = chartInstance.containPixel('geo', pixel);
      if (geoContained) {
        // 查找该区域是否有数据
        const regionName = params.name;
        const option = chartInstance.getOption();
        const seriesData = option.series && option.series[0] ? option.series[0].data : [];
        const regionData = seriesData.find(
          (d: any) => d.name === regionName || d.value[3] === regionName,
        );

        if (regionData && regionData.value && regionData.value[3]) {
          // 模拟symbol点击
          issueModalRef.current?.onShow({ name: regionData.value[3] });
        }
      }
    }
  };

  const onMainEvents = {
    click: (params: any) => {
      const chartInstance = mainChartRef.current?.getEchartsInstance();
      if (chartInstance) {
        handleMapClick(params, chartInstance);
      }
    },
  };

  const onCqEvents = {
    click: (params: any) => {
      const chartInstance = cqChartRef.current?.getEchartsInstance();
      if (chartInstance) {
        handleMapClick(params, chartInstance);
      }
    },
  };

  return (
    <div className={styles.mapBox}>
      <div className={styles.cqMapWrapper}>
        <ReactECharts
          ref={cqChartRef}
          style={{ width: '100%', height: '100%' }}
          option={cqEchartsOption}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onCqEvents}
        />
      </div>
      <div className={styles.mainCqMapBox}>
        <ReactECharts
          ref={mainChartRef}
          style={{ width: '100%', height: '100%' }}
          option={mainCqEchartsOption}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onMainEvents}
        />
      </div>

      <IssueModal modalRef={issueModalRef} />
      <img className={styles.mapBg} src={CqMapPng}></img>
      <img className={styles.cqMainMapBg} src={CqMainMapPng}></img>
      <div className={styles.mapBgBox}></div>
      <div className={styles.totalBox}>
        <div className={styles.totalTitle}>全市问题数</div>
        <div className={styles.total}>
          <span className={styles.totalNum}>{cityTotal}</span>
          <span className={styles.unit}>个</span>
        </div>
      </div>
    </div>
  );
};

export default CqMap;
