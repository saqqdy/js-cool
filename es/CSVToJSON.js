'use strict';

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
function CSVToJSON(data, delimiter = ',') {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map((v) => {
        const values = v.split(delimiter);
        return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
    });
}

module.exports = CSVToJSON;
