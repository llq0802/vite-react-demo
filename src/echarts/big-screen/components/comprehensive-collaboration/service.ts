import { request } from '@umijs/max';
import { ComprehensiveCollaborationItem } from '.';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: ComprehensiveCollaborationItem[];
}

/**
 * 多跨协同数据获取-水
 */
export function apiGetComprehensiveCollaborationWater(): Promise<IssueFetchResult> {
  // return request('/water/ext/telecom/interface/synergism', {
  return request(`/mock/dashboard-comprehensive-collaboration-shui.json`, {
    method: 'get',
  });
}

/**
 * 多跨协同数据获取-气
 */
export function apiGetComprehensiveCollaborationGas(): Promise<IssueFetchResult> {
  return request(`/mock/dashboard-comprehensive-collaboration-qi.json`, {
    method: 'get',
  });
}

/**
 * 多跨协同数据获取-废
 */
export function apiGetComprehensiveCollaborationWaste(): Promise<IssueFetchResult> {
  return request(`/mock/dashboard-comprehensive-collaboration-fei.json`, {
    method: 'get',
    // return request(`/waste/api/bayu/synergism`, {
    //   method: 'post',
  });
}
