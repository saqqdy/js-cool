/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 截取小数点后几位，不足的不补0
 *
 * @param number - 要处理的数字，必填
 * @param n - 要保留的小数点位数，默认保留2位
 * @returns 返回新数字
 */
function fixNumber(number, n = 2) {
    let reg = new RegExp('^(.*\\..{' + n + '}).*$');
    number = '' + number;
    if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
        console.warn('请传入数字');
        return number;
    }
    return parseFloat(number.replace(reg, '$1'));
}

exports["default"] = fixNumber;
exports.fixNumber = fixNumber;
