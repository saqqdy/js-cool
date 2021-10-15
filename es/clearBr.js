/*!
 * js-cool v2.2.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 去除换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearBr(string) {
    return string
        .replace(/<\/br>/g, '')
        .replace(/<br>/g, '')
        .replace(/[\r\n]/g, '');
}

exports.clearBr = clearBr;
exports["default"] = clearBr;
