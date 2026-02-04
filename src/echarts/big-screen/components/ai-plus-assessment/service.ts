import { request } from '@umijs/max';
import { AIPlusAssessmeentResponseItem } from '.';
import { getGasToken, getWaterToken } from '../../utils';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: AIPlusAssessmeentResponseItem[];
}
const isDev = process.env.NODE_ENV === 'development';
/**
 * AI+指标分析-水
 */
export function apiGetIndicatorWater(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zhibiaofenxi-shui.json`, {
      method: 'get',
    });
  }
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${date.getFullYear()}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
  const params = {
    startDate: dateStr,
    endDate: dateStr,
    usertoken: getWaterToken(),
  };
  return request(`/water/ext/api/bayu/selectListV1`, { method: 'get', params });
}

/**
 * AI+指标分析-气
 */
export function apiGetIndicatorGas(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zhibiaofenxi-qi.json`, {
      method: 'get',
    });
  }
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${date.getFullYear()}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
  const params = {
    startTime: `${dateStr} 00:00:00`,
    endTime: `${dateStr} 23:59:59`,
    token: getGasToken(),
  };
  return request(`/gas/prod-api/cockpit/aimanagnmentqx/getMonitorhourForDianXin`, {
    method: 'get',
    params,
  });
}

/**
 * AI+指标分析-费
 */
export function apiGetIndicatorWaste(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zhibiaofenxi-fei.json`, {
      method: 'get',
    });
  }
  return request(`/mock/dashboard-zhibiaofenxi-fei.json`, {
    method: 'get',
  });
}
