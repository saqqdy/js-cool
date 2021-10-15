/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.reduce.js');
require('core-js/modules/es.array.filter.js');
require('core-js/modules/es.array.concat.js');
var contains = require('./contains.js');
var unique = require('./unique.js');

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
      return contains(cur, item);
    });
  });
}
/**
 * 求多个数组的并集
 *
 * @example
 * ```js
 * union([1, 2], [2, '33']) // [1, 2, '33']
 * ```
 * @param args - 参数
 * @returns array
 */

function union() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return unique(args.reduce(function (pre, cur) {
    return pre.concat(cur.filter(function (item) {
      return !contains(pre, item);
    }));
  }));
}
/**
 * 求多个数组的差集，属于A但不属于B/C/D...的元素
 *
 * @example
 * ```js
 * minus([1, 2], [2, '33'], [2, 4]) // [1]
 * ```
 * @param args - 参数
 * @returns array
 */

function minus() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return args.reduce(function (pre, cur, index) {
    index === 1 && (pre = unique(pre));
    return pre.filter(function (item) {
      return !contains(cur, item);
    });
  });
}
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

  var intersectArray = intersect.apply(void 0, args); // 交集

  var unionArray = union.apply(void 0, args); // 补集

  return unionArray.filter(function (item) {
    return !contains(intersectArray, item);
  });
}
var array = {
  intersect: intersect,
  union: union,
  minus: minus,
  complement: complement
};

exports.complement = complement;
exports["default"] = array;
exports.intersect = intersect;
exports.minus = minus;
exports.union = union;
