'use strict';

/**
 * 如果所提供的谓词函数对一个集合中的至少一个元素返回true，则返回true，否则返回false。
 *
 * @example
 * ```js
 * any([0, 1, 2, 0], x => x >= 2); // true
 * ```
 * @example
 * ```js
 * any([0, 0, 1, 0]); // true
 * ```
 * @param arr - 目标数组
 * @param fn - 判断方法
 * @returns 返回判断结果
 */
const any = (arr, fn) => arr.some(fn);

module.exports = any;
