'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签保留空格、换行
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtmlExpSN = function clearHtmlExpSN(string) {
  return string.replace(/<\/?[^\/?(br)][^><]*>/gi, '');
};

module.exports = clearHtmlExpSN;
