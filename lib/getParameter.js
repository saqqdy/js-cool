'use strict';

require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.match.js');
require('core-js/modules/es.string.search.js');

/**
 * 获取单个URL参数
 *
 * @param name - 参数名称
 * @returns 返回参数值
 */
function getParameter(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

module.exports = getParameter;
