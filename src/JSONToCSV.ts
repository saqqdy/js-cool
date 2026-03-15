/**
 * Converts an array of objects to a comma-separated value (CSV) string containing only the specified columns.
 *
 * @example
 * ```js
 * // Basic usage
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a', 'b'])
 * // 'a,b\n"1","2"\n"3","4"'
 *
 * // With custom delimiter
 * JSONToCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a', 'b'], ';')
 * // 'a;b\n"1";"2"\n"3";"4"'
 *
 * // Missing values become empty strings
 * JSONToCSV([{ a: 1 }, { b: 2 }], ['a', 'b'])
 * // 'a,b\n"1",""\n"","2"'
 *
 * // With special characters
 * JSONToCSV([{ name: 'test', value: '"quoted"' }], ['name', 'value'])
 * // 'name,value\n"test","""quoted"""'
 * ```
 * @since 1.0.9
 * @param data - array of objects
 * @param columns - the specified columns to include
 * @param delimiter - delimiter, default ','
 * @returns - CSV string
 */
const JSONToCSV = (arr: any[], columns: any[], delimiter = ','): string =>
	[
		columns.join(delimiter),
		...arr.map(obj =>
			columns.reduce(
				(acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
				''
			)
		),
	].join('\n')

export default JSONToCSV
