/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签保留空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlExpSN(string) {
  return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
}

module.exports = clearHtmlExpSN;
