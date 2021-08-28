'use strict';

require('core-js/modules/es.date.to-string.js');
var getCookie = require('./getCookie.js');

/**
 * 删除cookie
 *
 * @param name - cookie名称
 */

function delCookie(name) {
  var e = new Date();
  e.setTime(e.getTime() - 1);
  var cval = getCookie(name);

  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/';
  }
}

module.exports = delCookie;
