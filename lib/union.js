/*!
 * js-cool v2.2.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.reduce.js');
require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.filter.js');
var contains = require('./contains.js');
var unique = require('./unique.js');

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

  return unique.unique(args.reduce(function (pre, cur) {
    return pre.concat(cur.filter(function (item) {
      return !contains.contains(pre, item);
    }));
  }));
}

exports["default"] = union;
exports.union = union;
