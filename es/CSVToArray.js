/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) => data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

exports.CSVToArray = CSVToArray;
exports["default"] = CSVToArray;
