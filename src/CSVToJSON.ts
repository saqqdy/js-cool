/**
 * Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.
 *
 * @example
 * ```js
 * CSVToJSON('col1,col2\\na,b\\\nc,d'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`.
 * ```
 * @example
 * ```js
 * CSVToJSON('col1;col2\\\na;b\\\nc;d', ';'); // `[{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]`.
 * ```
 * @param data - csv data
 * @param delimiter - delimiter, default ','
 * @returns json
 */
function CSVToJSON(data: string, delimiter = ',') {
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

export default CSVToJSON
