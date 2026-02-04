import { request } from '@umijs/max';
import { ClearWaterItem } from '.';
import { getWaterToken } from '../../utils';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: ClearWaterItem[];
}
const isDev = process.env.NODE_ENV === 'development';
/**
 * 碧水保卫战数据获取
 */
export function apiGetClearWater(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-bishuibaoweizhan.json`, {
      method: 'get',
    });
  }
  return request(
    `/water/ext/sqdscreen/command/dispatch/selectListV4?type=KPI&usertoken=${getWaterToken()}`,
    {
      method: 'get',
    },
  );
}
