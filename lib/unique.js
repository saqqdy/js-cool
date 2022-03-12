/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

var contains = require('./contains.js');

/**
 * 数组去重
 *
 * @example
 * ```js
 * unique([1, 2, 2, '33']) // [1, 2, '33']
 * ```
 * @returns array
 */

function unique(arr) {
  var newArray = [];

  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var el = arr_1[_i];
    !contains(newArray, el) && newArray.push(el);
  }

  return newArray;
}

module.exports = unique;
