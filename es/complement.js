/*!
 * js-cool v2.3.0
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
import contains from './contains.js';
import intersect from './intersect.js';
import union from './union.js';

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
function complement(...args) {
    const intersectArray = intersect(...args); // 交集
    const unionArray = union(...args); // 补集
    return unionArray.filter(item => !contains(intersectArray, item));
}

export { complement as default };
