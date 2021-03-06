'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签
 * @param {String} string 带html标签的字符串
 * @returns {String}
 */
var clearHtml = function clearHtml(string) {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
};

module.exports = clearHtml;
