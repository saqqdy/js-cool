/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
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
    for (const el of arr) {
        if (el === item)
            return true;
    }
    return false;
}

export { contains as default };
