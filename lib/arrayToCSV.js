'use strict';

require('core-js/modules/es.array.join.js');
require('core-js/modules/es.array.map.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');

/**
 * 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
 *
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
 * ```
 * @example
 * ```js
 * arrayToCSV([['a', '"b" great'], ['c', 3.1415]]); // '"a","""b"" great"\n"c",3.1415'
 * ```
 * @param data - json数据
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */
var arrayToCSV = function arrayToCSV(arr, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  return arr.map(function (v) {
    return v.map(function (x) {
      return isNaN(x) ? "\"" + x.replace(/"/g, '""') + "\"" : x;
    }).join(delimiter);
  }).join('\n');
};

module.exports = arrayToCSV;
