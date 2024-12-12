/**
 * 执行条件
 * @param value
 * @param condition
 * @param targetValue
 * @param ctrl
 * @returns
 */
export const executeCondition = (value: any, condition: string, targetValue: any, ctrl: any): boolean => {
  // 自定义函数执行优先级高
  if (typeof ctrl.handle === 'function') {
    return ctrl.handle(value);
  }
  switch (condition) {
    case '==': {
      return value === targetValue;
    }
    case 'between': {
      if (Array.isArray(targetValue) && targetValue.length === 2) {
        return value >= Number(targetValue[0]) && value <= Number(targetValue[1]);
      }
      return false;
    }

    case 'notBetween': {
      if (Array.isArray(targetValue) && targetValue.length === 2) {
        return value < Number(targetValue[0]) || value > Number(targetValue[1]);
      }
      return false;
    }

    default:
      return false;
  }
};

/**
 * 递归查询的对应的对象
 * @param rules
 * @param key
 * @returns
 */
export const findValuesByKey = (rules: any[], key: string) => {
  let result = {};
  rules.forEach((item) => {
    if (item.name === key) {
      result = item;
    }
    if (item.control || item.rule) {
      findValuesByKey(item.control || item.rule, key);
    }
  });
  return result;
};
