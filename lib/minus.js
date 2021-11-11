/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.array.reduce.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.array.filter.js');
var contains = require('./contains.js');
var unique = require('./unique.js');

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

module.exports = minus;
