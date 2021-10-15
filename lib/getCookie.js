/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.match.js');

/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
function getCookie(name) {
  var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  arr = document.cookie.match(reg);

  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

exports["default"] = getCookie;
exports.getCookie = getCookie;
