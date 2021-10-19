/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签及换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlN(string) {
  return string.replace(/<\/?.+?>|[\r\n]/g, '');
}

exports.clearHtmlN = clearHtmlN;
exports["default"] = clearHtmlN;
