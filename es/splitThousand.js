/*!
 * js-cool v2.2.4
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 数字千分位分割
 *
 * @param value - 数字
 * @returns 分割后的字符串
 */
function splitThousand(val) {
    if (!val)
        return val === 0 || val === '0' ? 0 : '';
    val = val.toString();
    if (val.split('.').length == 1)
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return (val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') +
        '.' +
        val.split('.')[1]);
}

exports["default"] = splitThousand;
exports.splitThousand = splitThousand;
