/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
import contains from './contains.js';
import unique from './unique.js';

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
function minus(...args) {
    return args.reduce((pre, cur, index) => {
        index === 1 && (pre = unique(pre));
        return pre.filter(item => !contains(cur, item));
    });
}

export { minus as default };
