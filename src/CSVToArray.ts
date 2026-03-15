/**
 * Converts a comma-separated string of values (CSV) to a 2D array.
 *
 * @example
 * ```js
 * // Basic usage
 * CSVToArray('a,b\\nc,d')
 * // [['a','b'],['c','d']]
 *
 * // With custom delimiter
 * CSVToArray('a;b\\nc;d', ';')
 * // [['a','b'],['c','d']]
 *
 * // Skip header row
 * CSVToArray('col1,col2\\na,b\\nc,d', ',', true)
 * // [['a','b'],['c','d']]
 *
 * // With numbers (as strings)
 * CSVToArray('1,2,3\\n4,5,6')
 * // [['1','2','3'],['4','5','6']]
 * ```
 * @since 1.0.9
 * @param data - csv data string
 * @param delimiter - separator, default ','
 * @param omitFirstRow - skip the first row (header), default false
 * @returns 2D array of values
 */
const CSVToArray = (data: string, delimiter = ',', omitFirstRow = false): string[][] =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter))

export default CSVToArray
