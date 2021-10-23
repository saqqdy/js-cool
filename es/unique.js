/*!
 * js-cool v2.2.4
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    let newArray = [];
    for (const el of arr) {
        !contains.contains(newArray, el) && newArray.push(el);
    }
    return newArray;
}

exports["default"] = unique;
exports.unique = unique;
