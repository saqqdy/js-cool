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
 * 去除HTML标签所有属性
 *
 * @param string - 传入字符串
 * @returns newString
 */
function clearAttr(string) {
  return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
}

module.exports = clearAttr;
