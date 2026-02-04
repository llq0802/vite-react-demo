import { request } from '@umijs/max';

interface IssueFetchResult<T> {
  code: number;
  msg: string;
  data: T[];
}

/**
 * AI+问题发现-水
 */
export function apiGetQuestionsWater(): Promise<
  IssueFetchResult<{ szycsbs: number; shyjs: number; hdljs: number }>
> {
  // return request(`/water/ext/mywork/problem/queryDeparentStatisticsV2`, {
  return request(`/mock/dashboard-aijiawentifaxian-shui.json`, {
    method: 'get',
    // params: {
    //   codes: 'SPJKWT_1,SZWT_1,RHPWKWT_1',
    //   usertoken: getWaterToken(),
    //   startDate: '',
    //   endDate: ''
    // }
  });
}

/**
 * AI+问题发现-气
 */
export function apiGetQuestionsGas(): Promise<
  IssueFetchResult<{ pm25cb: number; ycwtfxl: number; jgfssbs: number }>
> {
  return request(`/mock/dashboard-aijiawentifaxian-qi.json`, {
    method: 'get',
  });
}

/**
 * AI+问题发现-废
 */
export function apiGetQuestionsWaste(): Promise<
  IssueFetchResult<{ handleTotalCount: number; transTotalCount: number; sourceTotalCount: number }>
> {
  return request(`/mock/dashboard-aijiawentifaxian-fei.json`, {
    method: 'get',
    // return request(`/waste/api/bayu/aiEventTotalStats`, {
    // method: 'post',
  });
}
