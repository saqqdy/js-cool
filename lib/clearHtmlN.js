'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签及换行
 * @param string - 带html标签的字符串
 * @returns newString
 */
var clearHtmlN = function clearHtmlN(string) {
  return string.replace(/<\/?.+?>|[\r\n]/g, '');
};

module.exports = clearHtmlN;
