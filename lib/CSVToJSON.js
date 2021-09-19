'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.array.slice.js');
require('core-js/modules/es.array.index-of.js');
require('core-js/modules/es.array.map.js');
require('core-js/modules/es.array.reduce.js');

/**
 * 将一个逗号分隔的值(CSV)字符串转换为一个2D对象数组。字符串的第一行作为标题行。
 *
 * @example
 * ```js
 * CSVToJSON('col1,col2\\na,b\\nc,d'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @example
 * ```js
 * CSVToJSON('col1;col2\\na;b\\nc;d', ';'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`;
 * ```
 * @param data - csv数据
 * @param delimiter - 分隔符，默认','
 * @returns json
 */
function CSVToJSON(data, delimiter) {
  if (delimiter === void 0) {
    delimiter = ',';
  }

  var titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data.slice(data.indexOf('\n') + 1).split('\n').map(function (v) {
    var values = v.split(delimiter);
    return titles.reduce(function (obj, title, index) {
      return obj[title] = values[index], obj;
    }, {});
  });
}

module.exports = CSVToJSON;
