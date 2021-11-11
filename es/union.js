/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
import contains from './contains.js';
import unique from './unique.js';

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
function union(...args) {
    return unique(args.reduce((pre, cur) => pre.concat(cur.filter(item => !contains(pre, item)))));
}

export { union as default };
