/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
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
