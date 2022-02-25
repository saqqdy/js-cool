/*!
 * js-cool v2.3.1
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2022 saqqdy 
 * Released under the MIT License.
 */
'use strict';

/**
 * 获取随机字符串带特殊符号
 *
 * @param len - 需要获取随机字符串的长度
 * @returns 随机串
 */
function getRandomStrWidthSpecialChar(len) {
  if (len === void 0) {
    len = 32;
  }

  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678~!@#$^&*_+=-.'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1

  var maxPos = chars.length;
  var str = '';

  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return str;
}

module.exports = getRandomStrWidthSpecialChar;
