/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.array.filter.js');
require('core-js/modules/es.object.to-string.js');
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

  var intersectArray = intersect.apply(void 0, args); // 交集

  var unionArray = union.apply(void 0, args); // 补集

  return unionArray.filter(function (item) {
    return !contains(intersectArray, item);
  });
}

module.exports = complement;
