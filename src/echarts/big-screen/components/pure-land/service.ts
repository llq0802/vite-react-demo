import { request } from '@umijs/max';
import { ResultItem } from '.';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: ResultItem;
}
const isDev = process.env.NODE_ENV === 'development';

/**
 * 净土保卫战数据获取
 */
export function apiGetPureLand(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-jingtubaoweizhan.json`, {
      method: 'get',
    });
  }
  return request(`/waste/api/bayu/indicators`, {
    method: 'post',
  });
}
