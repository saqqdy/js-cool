/*!
 * js-cool v2.2.4
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.reduce.js');
require('core-js/modules/es.array.filter.js');
var contains = require('./contains.js');

/**
 * 求多个数组的交集
 *
 * @example
 * ```js
 * intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
 * ```
 * @param args - 参数
 * @returns array
 */

function intersect() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return args.reduce(function (pre, cur) {
    return pre.filter(function (item) {
      return contains.contains(cur, item);
    });
  });
}

exports["default"] = intersect;
exports.intersect = intersect;
