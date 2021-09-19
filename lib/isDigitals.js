'use strict';

/**
 * 是否为由数字组成的字符串
 *
 * @param str - 待检测的字符串
 * @returns 返回true/false
 */
function isDigitals(str) {
  return /^[0-9]*$/.test(str);
}

module.exports = isDigitals;
