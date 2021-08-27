'use strict';

require('core-js/modules/es.array.index-of.js');
require('core-js/modules/es.object.to-string.js');

/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

module.exports = isArray;
