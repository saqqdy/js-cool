/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.index-of.js');
require('core-js/modules/es.object.to-string.js');

/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

exports["default"] = isArray;
exports.isArray = isArray;
