/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 数组是否包含指定元素
 *
 * @example
 * ```js
 * contains([1, 2], 2) // true
 * contains([1, 2], 3) // false
 * ```
 * @param arr - 目标数组
 * @param item - 要查找的目标
 * @returns boolean
 */
function contains(arr, item) {
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var el = arr_1[_i];
    if (el === item) return true;
  }

  return false;
}

module.exports = contains;
