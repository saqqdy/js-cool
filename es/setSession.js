/*!
 * js-cool v2.2.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
function setSession(name, value, seconds) {
    var e = new Date();
    var expires = seconds ? e.getTime() + seconds * 1000 : '';
    var obj = {};
    obj.value = value;
    obj.expires = expires;
    sessionStorage.setItem(name, JSON.stringify(obj));
}

exports["default"] = setSession;
exports.setSession = setSession;
