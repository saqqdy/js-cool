/*!
 * js-cool v2.2.4
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 获取字符串中的数字
 *
 * @example
 * ```js
 * getNumber('Chrome123.33'); // '123.33';
 * getNumber('234test.88'); // '234.88';
 * ```
 * @param string - 传入带数字的字符串
 * @returns 返回纯数字字符串
 */
function getNumber(string) {
    return string.replace(/[^0-9.]/gi, '');
}

exports["default"] = getNumber;
exports.getNumber = getNumber;
