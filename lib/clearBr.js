'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearBr = function clearBr(string) {
  return string.replace(/<\/br>/g, '').replace(/<br>/g, '').replace(/[\r\n]/g, '');
};

module.exports = clearBr;
