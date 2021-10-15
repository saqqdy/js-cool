/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 将驼峰字符串转成-间隔且全小写的Dash模式
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function camel2Dash(string) {
    return string
        .replace(/([A-Z]{1,1})/g, '-$1')
        .replace(/^-/, '')
        .toLocaleLowerCase();
}

exports.camel2Dash = camel2Dash;
exports["default"] = camel2Dash;
