/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 读取完整IPv6
 *
 * @example
 * ```js
 * fillIPv6('2409:8005:800::2'); // '2409:8005:0800:0000:0000:0000:0000:0002'
 * fillIPv6('2409:8005:800::1c'); // '2409:8005:0800:0000:0000:0000:0000:001c'
 * ```
 * @returns string
 */
function fillIPv6(ip) {
    return ip
        .replace(/\w+/g, a => ('000' + a).substr(-4))
        .replace(/::/, () => {
        let dotLen = 8 - ip.match(/:/g).length, str = ':';
        while (dotLen--) {
            str += '0000:';
        }
        return str;
    });
}

exports["default"] = fillIPv6;
exports.fillIPv6 = fillIPv6;
