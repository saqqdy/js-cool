/**
 * Converts a two-dimensional array to a comma-separated string of values (CSV).
 *
 * @example
 * ```js
 * arrayToCSV([['a', 'b'], ['c', 'd']])
 * // '"a", "b" \n "c", "d"'
 *
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';')
 * // '"a"; "b"\n "c"; "d"'
 *
 * arrayToCSV([['a', '"b" great'], ['c', 3.1415]])
 * // '"a", """b"" great"\n "c",3.1415'
 * ```
 * @param data - json data
 * @param delimiter - delimiter, default ','
 * @returns CSV data
 */
const arrayToCSV = <T extends unknown[][]>(arr: T, delimiter = ',') =>
	arr
		.map(v => v.map((x: any) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter))
		.join('\n')

export default arrayToCSV
