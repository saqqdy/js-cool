'use strict';

require('core-js/modules/es.array.slice.js');

/**
 * upperFirst
 * 首字母大写
 * @param {String} string 需要转换的字符串
 * @returns {String} 返回转换后的字符串
 */
var upperFirst = function upperFirst(string) {
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};

module.exports = upperFirst;
