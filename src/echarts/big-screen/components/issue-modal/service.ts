import { request } from '@umijs/max';
import type { FetchParams, FetchResult } from './interface';

const isDev = process.env.NODE_ENV === 'development';

/**
 * 获取气问题列表
 */
export function apiGetAirIssues(params: FetchParams): Promise<FetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-city-air-issue-data.json`, {
      method: 'get',
      params,
    });
  }
  return request(`/cockpit/water/page`, {
    method: 'get',
    params: {
      ...params,
      type: '气',
    },
  });
}

/**
 * 获取水问题列表
 */
export function apiGetWaterIssues(params: FetchParams): Promise<FetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-city-water-issue-data.json`, {
      method: 'get',
      params,
    });
  }
  return request(`/cockpit/water/page`, {
    method: 'get',
    params: {
      ...params,
      type: '水',
    },
  });
}

/**
 * 获取废问题列表
 */
export function apiGetLandIssues(data: FetchParams): Promise<FetchResult> {
  return request(`/waste/api/bayu/dxEventPage`, {
    method: 'post',
    data: {
      pageNum: data.pageNo,
      pageSize: data.pageSize,
      district: data.district,
      questionType: data?.questionType,
    },
  });
}
