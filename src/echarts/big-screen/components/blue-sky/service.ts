import { request } from '@umijs/max';
import { BlueSkyData } from '.';
import { getGasToken } from '../../utils';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: BlueSkyData;
}
const isDev = process.env.NODE_ENV === 'development';

/**
 * 蓝天保卫战数据获取
 */
export function apiGetBlueSky(): Promise<IssueFetchResult> {
  // return request(`/mock/dashboard-lantianbaoweizhan.json`, {
  if (isDev) {
    return request(`/mock/dashboard-lantianbaoweizhan.json`, {
      // mock方式
      method: 'get',
    });
  }
  return request(`/gas/prod-api/cockpit/aimanagnmentqx/getLtbwzForDianXin?token=${getGasToken()}`, {
    // mock方式
    method: 'get',
  });
}
