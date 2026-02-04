import mapWarningActiveIcon from '@/assets/imgs/home/issue_icon_active.svg';
import { remToPx } from '@/utils/common';

export interface SymbolConfig {
  symbolSize: [number, number];
  symbolOffset: [string | number, string | number];
  symbol: string;
}

const smallAreaList = [
  '北碚区',
  '渝北区',
  '江北区',
  '南岸区',
  '巴南区',
  '九龙坡区',
  '沙坪坝区',
  '大渡口区',
  '渝中区',
];

export const getDynamicSymbolConfig = (areaName: string, value: number): Partial<SymbolConfig> => {
  const baseSymbol = `image://${mapWarningActiveIcon}`;

  if (smallAreaList.includes(areaName)) {
    return {
      symbol: baseSymbol,
      symbolSize: [remToPx(0.5), remToPx(0.65)],
      symbolOffset: [0, '-50%'],
    };
  }

  // if (mediumAreaList.includes(areaName)) {
  //   return {
  //     symbol: baseSymbol,
  //     symbolSize: [40, 50],
  //     symbolOffset: [0, '-45%'],
  //   };
  // }

  // if (value > 100) {
  //   return {
  //     symbol: baseSymbol,
  //     symbolSize: [45, 65],
  //     symbolOffset: [0, '-35%'],
  //   };
  // }

  return {
    symbol: baseSymbol,
    symbolSize: [remToPx(0.65), remToPx(0.82)],
    symbolOffset: [0, '-40%'],
  };
};
