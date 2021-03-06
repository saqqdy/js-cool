'use strict';

require('core-js/modules/es.date.to-string.js');

/**
 * 写sessionStorage
 * @param {String} name 名称
 * @param {*} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds 有效时间
 */
function setSession(name, value, seconds) {
  var e = new Date();
  var expires = seconds ? e.getTime() + seconds * 1000 : '';
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  obj = JSON.stringify(obj);
  sessionStorage.setItem(name, obj);
}

module.exports = setSession;
