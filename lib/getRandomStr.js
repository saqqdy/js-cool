/*!
 * js-cool v2.2.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 获取随机字符串
 *
 * @param len - 需要获取随机字符串的长度
 * @param widthSpecialChar - 可选，是否需要生成带特殊字符的串
 * @returns 随机串
 */
function getRandomStr(len, widthSpecialChar) {
  if (len === void 0) {
    len = 32;
  }

  if (widthSpecialChar === void 0) {
    widthSpecialChar = false;
  }

  var chars = !widthSpecialChar ? 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' : 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  //var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
}

exports["default"] = getRandomStr;
exports.getRandomStr = getRandomStr;
