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
 * 获取字符串中的数字
 *
 * @example
 * ```js
 * getNumber('Chrome123.33'); // '123.33';
 * getNumber('234test.88'); // '234.88';
 * ```
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
function getNumber(string) {
  return string.replace(/[^0-9.]/gi, '');
}

module.exports = getNumber;
