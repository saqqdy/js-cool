'use strict';

require('core-js/modules/es.array.index-of.js');
require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');

/**
 * @description 判断是否数组
 * @param {Array} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

module.exports = isArray;
