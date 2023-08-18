/**
 * Converts a comma-separated string of values (CSV) to a 2D array.
 *
 * @example
 * ```js
 * CSVToArray('a,b\\nc,d')
 * // `[['a','b'],['c','d']]`.
 *
 * CSVToArray('a;b\\\nc;d', ';')
 * // `[['a','b'],['c','d']]`.
 *
 * CSVToArray('col1,col2\\\na,b\\\nc,d', ',', true)
 * // `[['a','b'],['c','d']]`.
 * ```
 * @param data - csv data
 * @param delimiter - separator, default ','
 * @param omitFirstRow - the first row is the table header data, default false
 * @returns array
 */
const CSVToArray = (data: string, delimiter = ',', omitFirstRow = false) =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter))

export default CSVToArray
