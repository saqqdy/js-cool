/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 阻止默认事件
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }

  return false;
}

exports["default"] = stopDefault;
exports.stopDefault = stopDefault;
