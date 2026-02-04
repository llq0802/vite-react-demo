/**
 * 获取水的token
 * @returns
 */
export const getWaterToken = () => {
  return localStorage.getItem('WaterToken');
};

/**
 * 获取气的token
 * @returns
 */
export const getGasToken = () => {
  return localStorage.getItem('GasToken');
};

/**
 * 处理数字或数字字符串，最多最多多保留两位小数
 * @param input 输入的数字或数字字符串
 * @returns 处理后的字符串（保留两位小数）或原始值（如果不是有效数字）
 */
export const formatToTwoDecimals = (input: string | number): string | number => {
  // 检查输入类型并转换为数字
  let numberValue: number;

  if (typeof input === 'number') {
    numberValue = input;
  } else if (typeof input === 'string') {
    // 尝试将字符串转换为数字
    numberValue = parseFloat(input);
    // 检查转换是否有效
    if (isNaN(numberValue)) {
      return input; // 不是有效数字字符串，返回原始字符串
    }
  } else {
    return input; // 既不是字符串也不是数字，返回原始值
  }

  // 检查是否为整数或小数位数不超过两位
  const parts = numberValue.toString().split('.');
  if (parts.length === 1 || parts[1].length <= 2) {
    return input; // 不需要处理，返回原始输入
  }

  // 保留两位小数（四舍五入）
  return numberValue.toFixed(2);
};
