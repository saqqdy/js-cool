/*!
 * js-cool v2.2.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * textarea或input对象将光标定位到文字尾部
 *
 * @param obj - dom对象
 */
function textareaMoveToEnd(obj) {
  obj.focus();
  var len = obj.value.length;

  if (document.selection) {
    var sel = obj.createTextRange();
    sel.moveStart('character', len);
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
    obj.selectionStart = obj.selectionEnd = len;
  }
}

exports["default"] = textareaMoveToEnd;
exports.textareaMoveToEnd = textareaMoveToEnd;
