/**
 * Converts an array of objects to a comma-separated value (CSV) string containing only the specified columns.
 *
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n "1", "2"\n "3", "4"\n "6",""\n"", "7"'
 * ```
 * @example
 * ```js
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n "1"; "2"\n "3"; "4"\n "6";""\n""; "7"'
 * ```
 * @param data - json data
 * @param columns - the specified columns
 * @param delimiter - delimiter, default ','
 * @returns CSV data
 */
const JSONToCSV = (arr: any[], columns: any[], delimiter = ','): string =>
	[
		columns.join(delimiter),
		...arr.map(obj =>
			columns.reduce(
				(acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
				''
			)
		)
	].join('\n')

export default JSONToCSV
