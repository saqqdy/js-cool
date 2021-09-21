/*!
 * js-cool v2.1.2
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

require('core-js/modules/es.date.to-string.js');

/**
 * 读取sessionStorage
 *
 * @param name - 名称
 * @returns 返回sessionStorage
 */
function getSession(name) {
  var str = sessionStorage.getItem(name);
  var exp = new Date();

  if (str) {
    var obj = JSON.parse(str);

    if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
      return null;
    } else {
      if (!obj.expires || obj.expires > exp.getTime()) {
        return obj.value;
      } else {
        sessionStorage.removeItem(name);
        return null;
      }
    }
  } else {
    return null;
  }
}

module.exports = getSession;
