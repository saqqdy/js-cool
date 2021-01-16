'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 去除HTML标签所有属性
 * @param {String} string 传入字符串
 * @returns {String}
 */
var clearAttr = function clearAttr(string) {
  return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>');
};

module.exports = clearAttr;
