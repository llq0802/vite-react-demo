import { request } from '@umijs/max';
import { TAB_TYPE } from '.';
import { getGasToken } from '../../utils';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: string;
}
const isDev = process.env.NODE_ENV === 'development';

/**
 * AI+综合评估-水
 */
export function apiGetEvaluationWaterDay(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zonghepinggu-shui-1.json`, {
      method: 'get',
    });
  }
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const params: Record<string, number | string> = {
    year: date.getFullYear(),
    month: month >= 10 ? month : `0${month}`,
    day: day >= 10 ? day : `0${day}`,
  };
  return request(`/water/ext/sqdscreen/gz/getWaterQualityDailyForExecutive`, {
    method: 'get',
    params,
  });
}
/**
 * 获取水月数据
 * @returns
 */
export function apiGetEvaluationWaterMonth(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zonghepinggu-shui-3.json`, {
      method: 'get',
    });
  }
  const date = new Date();
  const month = date.getMonth() + 1;
  const params: Record<string, number | string> = {
    year: date.getFullYear(),
    month: month >= 10 ? month : `0${month}`,
  };
  return request(`/water1/jczx/water/waterMonthlyExport/getWaterMonthlyReportForExecutive`, {
    method: 'get',
    params,
  });
}

/**
 * AI+综合评估-气
 */
export function apiGetEvaluationGas(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-zonghepinggu-qi.json`, {
      method: 'get',
    });
  }
  return request(
    `/gas/prod-api/cockpit/aimanagnmentqx/getKqzljbYdhForDianXin?token=${getGasToken()}`,
    {
      method: 'get',
    },
  );
}

/**
 * AI+综合评估-费
 */
export function apiGetEvaluationWaste(params: { type: TAB_TYPE }): Promise<IssueFetchResult> {
  return request(`/mock/dashboard-zonghepinggu-fei.json`, {
    method: 'get',
    params,
  });
}

/**
 * 水数据下载-日
 * @returns
 */
export function apiDownloadWaterDay(): Promise<IssueFetchResult> {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const params = {
    year: date.getFullYear(),
    month: month >= 10 ? month : `0${month}`,
    day: day >= 10 ? day : `0${day}`,
  };
  return request(`/water/ext/sqdscreen/gz/wordReportForWaterQualityDaily`, {
    method: 'get',
    params,
  });
}

/**
 * 水数据下载-月
 * @returns
 */
export function apiDownloadWaterMonth(): Promise<IssueFetchResult> {
  const date = new Date();
  const month = date.getMonth() + 1;
  const params = {
    year: date.getFullYear(),
    month: month >= 10 ? month : `0${month}`,
  };
  return request(`/water1/jczx/water/waterMonthlyExport/wordReportAndUpload`, {
    method: 'get',
    params,
  });
}
