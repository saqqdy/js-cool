/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 获取目标类型
 *
 * @param target - 目标
 * @returns 类型
 */
function getType(target) {
    let type = {
        '[object Array]': 'array',
        '[object Boolean]': 'boolean',
        '[object Date]': 'date',
        '[object Function]': 'function',
        '[object Number]': 'number',
        '[object Object]': 'object',
        '[object RegExp]': 'regexp',
        '[object String]': 'string'
    };
    if (target === null)
        return target + '';
    return typeof target === 'object' || typeof target === 'function' ? type[Object.prototype.toString.call(target)] || 'object' : typeof target;
}

exports["default"] = getType;
exports.getType = getType;
