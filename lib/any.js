'use strict';

require('core-js/modules/es.array.some.js');

/**
 * @description 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
 * @example any([0, 1, 2, 0], x => x >= 2); // true
 * @example any([0, 0, 1, 0]); // true
 * @param {Array} arr 目标数组
 * @param {Function} fn 判断方法
 * @returns {Boolean} 返回判断结果
 */
var any = function any(arr, fn) {
  if (fn === void 0) {
    fn = Boolean;
  }

  return arr.some(fn);
};

module.exports = any;
