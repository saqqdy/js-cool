'use strict';

require('core-js/modules/es.array.join.js');
require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.map.js');
require('core-js/modules/es.array.reduce.js');

/**
 * @description 将一个对象数组转换为只包含指定列的逗号分隔值（CSV）字符串。
 * @example JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
 * @example JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
 * @param {Array} data json数据
 * @param {Array} columns 指定列
 * @param {String} delimiter 分隔符，默认','
 * @returns {String} CSV数据
 */
var JSONToCSV = function JSONToCSV(arr, columns, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  return [columns.join(delimiter)].concat(arr.map(function (obj) {
    return columns.reduce(function (acc, key) {
      return "" + acc + (!acc.length ? '' : delimiter) + "\"" + (!obj[key] ? '' : obj[key]) + "\"";
    }, '');
  })).join('\n');
};

module.exports = JSONToCSV;
