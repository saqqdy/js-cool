/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 去除HTML标签保留空格、换行
 *
 * @param string - 带html标签的字符串
 * @returns newString
 */
function clearHtmlExpSN(string) {
    return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
}

exports.clearHtmlExpSN = clearHtmlExpSN;
exports["default"] = clearHtmlExpSN;
