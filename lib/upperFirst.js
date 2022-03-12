/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.array.slice.js');

/**
 * 首字母大写
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function upperFirst(string) {
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
}

module.exports = upperFirst;
