/**
 * @description 将一个逗号分隔的值（CSV）字符串转换为一个2D数组。
 * @example CSVToArray('a,b\nc,d'); // [['a','b'],['c','d']];
 * @example CSVToArray('a;b\nc;d', ';'); // [['a','b'],['c','d']];
 * @example CSVToArray('col1,col2\na,b\nc,d', ',', true); // [['a','b'],['c','d']];
 * @param {String} data csv数据
 * @param {String} delimiter 分隔符，默认','
 * @param {Boolean} omitFirstRow 第一行是表头数据，默认false
 * @returns {Object} array
 */
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map(v => v.split(delimiter))

export default CSVToArray
