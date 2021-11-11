/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 是否存在指定变量
 *
 * @param variableName - 传入变量名称
 * @returns 返回true/false
 */
function isExitsVariable(variableName) {
  try {
    if (typeof variableName === 'undefined') {
      return false;
    } else {
      return true;
    }
  } catch (_a) {}

  return false;
}

module.exports = isExitsVariable;
