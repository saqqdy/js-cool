'use strict';

require('core-js/modules/es.array.join.js');
require('core-js/modules/es.array.map.js');
require('core-js/modules/es.array.reduce.js');
var tslib_es6 = require('./node_modules/tslib/tslib.es6.js');

/**
 * 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
 *
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
 * ```
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
 * ```
 * @param data - json数据
 * @param columns - 指定列
 * @param delimiter - 分隔符，默认','
 * @returns CSV数据
 */

var JSONToCSV = function JSONToCSV(arr, columns, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  return tslib_es6.__spreadArray([columns.join(delimiter)], arr.map(function (obj) {
    return columns.reduce(function (acc, key) {
      return "" + acc + (!acc.length ? '' : delimiter) + "\"" + (!obj[key] ? '' : obj[key]) + "\"";
    }, '');
  })).join('\n');
};

module.exports = JSONToCSV;
