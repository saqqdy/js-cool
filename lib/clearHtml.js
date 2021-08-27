'use strict';

require('./node_modules/core-js/modules/es.regexp.exec.js');
require('./node_modules/core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签
 * @param string - 带html标签的字符串
 * @returns
 */
var clearHtml = function clearHtml(string) {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
};

module.exports = clearHtml;
