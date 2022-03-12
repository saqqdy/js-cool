/*!
 * js-cool v2.3.2
 * 这是一个纯原生ES6开发的Javascript常用方法库
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
import contains from './contains.js';

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
    let newArray = [];
    for (const el of arr) {
        !contains(newArray, el) && newArray.push(el);
    }
    return newArray;
}

export { unique as default };
