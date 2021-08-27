'use strict';

require('./node_modules/core-js/modules/es.array.index-of.js');
require('./node_modules/core-js/modules/es.object.to-string.js');

/**
 * @description 判断是否数组
 * @param arr -
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

module.exports = isArray;
