/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 是否存在指定函数
 *
 * @param funcName - 传入函数名
 * @returns 返回true/false
 */
function isExitsFunction(funcName) {
    try {
        if (typeof eval(funcName) === 'function') {
            return true;
        }
    }
    catch (_a) { }
    return false;
}

exports["default"] = isExitsFunction;
exports.isExitsFunction = isExitsFunction;
