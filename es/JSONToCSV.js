/*!
 * js-cool v2.1.3
 * 一些常用的JS方法，支持按需引入
 * (c) 2019-2021 saqqdy 
 * Released under the MIT License.
 */
'use strict';

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
const JSONToCSV = (arr, columns, delimiter = ',') => [columns.join(delimiter), ...arr.map(obj => columns.reduce((acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`, ''))].join('\n');

module.exports = JSONToCSV;
