/**
 * @description 将一个二维数组转换为一个逗号分隔的值（CSV）字符串。
 * @example arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
 * @example arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
 * @example arrayToCSV([['a', '"b" great'], ['c', 3.1415]]); // '"a","""b"" great"\n"c",3.1415'
 * @param {Array} data json数据
 * @param {String} delimiter 分隔符，默认','
 * @returns {String} CSV数据
 */
const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.map(x => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)).join('\n')

export default arrayToCSV
