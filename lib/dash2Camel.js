/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 将-间隔且全小写的Dash模式转成驼峰字符串
 *
 * @param string - 需要转换的字符串
 * @returns 返回转换后的字符串
 */
function dash2Camel(string) {
  return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
    return arguments[1].toLocaleUpperCase();
  });
}

exports.dash2Camel = dash2Camel;
exports["default"] = dash2Camel;
