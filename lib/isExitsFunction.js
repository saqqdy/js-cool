'use strict';

/**
 * 是否存在指定函数
 *
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
function isExitsFunction(funcName) {
  try {
    if (typeof eval(funcName) === 'function') {
      return true;
    }
  } catch (_a) {}

  return false;
}

module.exports = isExitsFunction;
