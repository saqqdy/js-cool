/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var contains = require('./contains.js');
var unique = require('./unique.js');

/**
 * 求多个数组的交集
 *
 * @example
 * ```js
 * intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
 * ```
 * @param args - 参数
 * @returns array
 */
function intersect(...args) {
    return args.reduce((pre, cur) => pre.filter(item => contains(cur, item)));
}
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
var array = {
    intersect,
    union,
    minus,
    complement
};

exports.complement = complement;
exports["default"] = array;
exports.intersect = intersect;
exports.minus = minus;
exports.union = union;
