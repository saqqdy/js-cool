/**
 * Converts a two-dimensional array to a comma-separated string of values (CSV).
 *
 * @example
 * ```js
 * // Basic usage
 * arrayToCSV([['a', 'b'], ['c', 'd']])
 * // '"a","b"\n"c","d"'
 *
 * // With custom delimiter
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';')
 * // '"a";"b"\n"c";"d"'
 *
 * // With numbers
 * arrayToCSV([['name', 'age'], ['John', 30], ['Jane', 25]])
 * // '"name","age"\n"John",30\n"Jane",25'
 *
 * // With special characters
 * arrayToCSV([['a', '"b" great'], ['c', 3.1415]])
 * // '"a","""b"" great"\n"c",3.1415'
 * ```
 * @since 1.0.9
 * @param arr - 2D array
 * @param delimiter - delimiter, default ','
 * @returns CSV string
 */
const arrayToCSV = <T extends unknown[][]>(arr: T, delimiter = ','): string =>
	arr
		.map(v =>
			v
				.map((x: any) => (typeof x === 'string' ? `"${x.replace(/"/g, '""')}"` : x))
				.join(delimiter)
		)
		.join('\n')

export default arrayToCSV
