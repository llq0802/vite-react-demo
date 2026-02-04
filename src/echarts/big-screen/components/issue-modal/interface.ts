export type IssueType = '水' | '气' | '废';

/**
 * 接口请求参数类型
 */
export interface FetchParams {
  /** 页数(从1开始) */
  pageNo: number;
  /** 每页数据条数 */
  pageSize: number;
  /** 区县名/全市 */
  district: string;
  /** 问题类型 */
  questionType?: string;
  /** 类型(气、水、) */
  type?: string;
}

/**
 * 接口返回数据类型
 */
export interface FetchResult {
  code: number;
  msg: string;
  data: {
    list: IssueRecord[];
    total: number;
  };
  rows: IssueRecord[];
  total: number;
}

/**
 * 问题记录类型
 */
export interface IssueRecord {
  /** 问题id */
  questionId: string;
  /** 问题类型 */
  questionType: string;
  /** 问题名称 */
  questionName: string;
  /** 问题描述 */
  questionDescription: string;
  /** 问题时间 */
  questionTime: string;
  /** 问题链接 */
  url: string;
}
