/*!
 * js-cool v2.2.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 阻止冒泡
 *
 * @param e - dom的event对象
 * @returns bool false
 */
function stopBubble(e) {
  if (e && e.stopPropagation) {
    // Firefox
    e.stopPropagation(); // e.preventDefault();
  } else {
    // IE
    e.cancelBubble = true; // e.returnValue = false;
  }

  return false;
}

exports["default"] = stopBubble;
exports.stopBubble = stopBubble;
