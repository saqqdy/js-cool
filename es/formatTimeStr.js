/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var formatTime = require('./formatTime.js');

/**
 * 格式化时间成：刚刚、几分钟前
 *
 * @param time - 时间对象或者字符串
 * @param fmt - 格式化风格
 * @returns 返回字符串
 */
function formatTimeStr(time, fmt) {
    var now = new Date().getTime();
    var format = fmt != '' && fmt != null ? fmt : 'MM-dd';
    if (typeof time === 'string')
        time = parseInt(time, 10);
    if (!time || time < 1)
        return '';
    var t = now - time;
    var newTimeStr = '';
    if (t < 60 * 2) {
        newTimeStr = '刚刚';
    }
    else if (t < 60 * 60) {
        newTimeStr = parseInt('' + t / 60) + '\u5206\u949F\u524D';
    }
    else if (t < 60 * 60 * 24) {
        newTimeStr = parseInt('' + t / (60 * 60)) + '\u5C0F\u65F6\u524D';
    }
    else if (t < 60 * 60 * 24 * 30) {
        newTimeStr = parseInt('' + t / (60 * 60 * 24)) + '\u5929\u524D';
    }
    else {
        newTimeStr = formatTime.formatTime(new Date(time), format);
    }
    return newTimeStr;
}

exports["default"] = formatTimeStr;
exports.formatTimeStr = formatTimeStr;
