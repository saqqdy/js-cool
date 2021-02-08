'use strict';

require('core-js/modules/es.date.to-string.js');

/**
 * setCookie写入cookie的方法
 * @param {String} name cookie名称
 * @param {String} value 设置要存储的值，可以是对象或字符串
 * @param {Number} seconds cookie有效时间默认1天
 * @param {String} path 路径，默认'/'
 * @param {Boolean} samesite SameSite，默认true
 */
function setCookie(name, value, seconds, path, samesite) {
  if (seconds === void 0) {
    seconds = 86400;
  }

  if (path === void 0) {
    path = '/';
  }

  if (samesite === void 0) {
    samesite = true;
  }

  var exp = new Date();
  exp.setTime(exp.getTime() + seconds * 1000);
  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=' + path + (samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '');
}

module.exports = setCookie;
