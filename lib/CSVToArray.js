'use strict';

require('core-js/modules/es.array.map.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.array.slice.js');
require('core-js/modules/es.array.index-of.js');

/**
 * 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
 *
 * @example
 * ```js
 * CSVToArray('a,b\\nc,d'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('a;b\\nc;d', ';'); // `[['a','b'],['c','d']]`;
 * ```
 * @example
 * ```js
 * CSVToArray('col1,col2\\na,b\\nc,d', ',', true); // `[['a','b'],['c','d']]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @param omitFirstRow - 第一行是表头数据，默认false
 * @returns array
 */
var CSVToArray = function CSVToArray(data, delimiter, omitFirstRow) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  if (omitFirstRow === void 0) {
    omitFirstRow = false;
  }

  return data.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0).split('\n').map(function (v) {
    return v.split(delimiter);
  });
};

module.exports = CSVToArray;
