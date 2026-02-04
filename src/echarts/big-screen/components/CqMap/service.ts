import { request } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';

interface IssueFetchResult {
  code: number;
  msg: string;
  data: {
    total: number;
    districtData: IssueItem[];
  };
}

interface IssueItem {
  district: string;
  num: number;
}

/**
 * 获取气问题列表
 */
export function apiGetMapAirIssues(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-map-air.json`, {
      method: 'get',
    });
  }
  return request(`/cockpit/water/listQuestionCount`, {
    method: 'get',
  });
}

/**
 * 获取水问题列表
 */
export function apiGetMapWaterIssues(): Promise<IssueFetchResult> {
  return request(`/mock/dashboard-map-water-null.json`, {
    // return request(`/water/ext/mywork/problem/queryDeparentStatistics`, {
    method: 'get',
    // params: {
    //   usertoken: getWaterToken(),
    // },
  });
}

/**
 * 获取废问题列表
 */
export function apiGetMapLandIssues(): Promise<IssueFetchResult> {
  if (isDev) {
    return request(`/mock/dashboard-map-land.json`, {
      method: 'get',
    });
  }
  return request(`/waste/api/bayu/eventDivision`, {
    method: 'post',
  });
}
/**
 * 获取废问题列表-mock
 */
// export function apiGetMapLandIssues(): Promise<IssueFetchResult> {
//   return request(`/mock/dashboard-map-land.json`, {
//     method: 'get',
//   });
// }
