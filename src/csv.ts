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
export const arrayToCSV = (arr: any[], delimiter = ',') =>
	arr
		.map(v => v.map((x: any) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter))
		.join('\n')

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
export const CSVToArray = (data: string, delimiter = ',', omitFirstRow = false) =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter))

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
export function CSVToJSON(data: string, delimiter = ',') {
	const titles = data.slice(0, data.indexOf('\n')).split(delimiter)
	return data
		.slice(data.indexOf('\n') + 1)
		.split('\n')
		.map((v: string) => {
			const values = v.split(delimiter)
			return titles.reduce(
				// eslint-disable-next-line no-sequences
				(obj: any, title, index) => ((obj[title] = values[index]), obj),
				{}
			)
		})
}

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
export const JSONToCSV = (arr: any[], columns: any[], delimiter = ','): string =>
	[
		columns.join(delimiter),
		...arr.map(obj =>
			columns.reduce(
				(acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
				''
			)
		)
	].join('\n')

export default {
	arrayToCSV,
	CSVToArray,
	CSVToJSON,
	JSONToCSV
}
