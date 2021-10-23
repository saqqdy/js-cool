/*!
 * js-cool v2.2.4
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var contains = require('./contains.js');
var intersect = require('./intersect.js');
var union = require('./union.js');

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
    const intersectArray = intersect.intersect(...args); // 交集
    const unionArray = union.union(...args); // 补集
    return unionArray.filter(item => !contains.contains(intersectArray, item));
}

exports.complement = complement;
exports["default"] = complement;
