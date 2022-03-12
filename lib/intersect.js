/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.array.reduce.js');
require('core-js/modules/es.object.to-string.js');
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
      return contains(cur, item);
    });
  });
}

module.exports = intersect;
