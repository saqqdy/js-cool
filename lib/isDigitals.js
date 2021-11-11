/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.regexp.exec.js');

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
