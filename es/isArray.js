'use strict';

/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
}

module.exports = isArray;
