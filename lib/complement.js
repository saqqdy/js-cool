/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.filter.js');
var contains = require('./contains.js');
var intersect = require('./intersect.js');
var union = require('./union.js');

/**
 * 求多个数组的补集
 *
 * @example
 * ```js
 * complement([1, 2], [2, '33'], [2]) // [1, '33']
 * ```
 * @param args - 参数
 * @returns array
 */

function complement() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var intersectArray = intersect.intersect.apply(void 0, args); // 交集

  var unionArray = union.union.apply(void 0, args); // 补集

  return unionArray.filter(function (item) {
    return !contains.contains(intersectArray, item);
  });
}

exports.complement = complement;
exports["default"] = complement;
