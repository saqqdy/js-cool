/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getCookie = require('./getCookie.js');

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
function delCookie(name) {
    var e = new Date();
    e.setTime(e.getTime() - 1);
    var cval = getCookie.getCookie(name);
    if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/';
    }
}

exports["default"] = delCookie;
exports.delCookie = delCookie;
