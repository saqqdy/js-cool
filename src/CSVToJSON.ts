/**
 * Converts a comma-separated string of values (CSV) to an array of 2D objects. The first line of the string is used as the header line.
 *
 * @example
 * ```js
 * // Basic usage
 * CSVToJSON('col1,col2\\na,b\\nc,d')
 * // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
 *
 * // With custom delimiter
 * CSVToJSON('col1;col2\\na;b\\nc;d', ';')
 * // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
 *
 * // With numbers (as strings)
 * CSVToJSON('name,age\\nJohn,30\\nJane,25')
 * // [{'name': 'John', 'age': '30'}, {'name': 'Jane', 'age': '25'}]
 *
 * // Empty values
 * CSVToJSON('a,b\\n1,\\n,2')
 * // [{'a': '1', 'b': ''}, {'a': '', 'b': '2'}]
 * ```
 * @since 1.0.9
 * @param data - csv data string
 * @param delimiter - delimiter, default ','
 * @returns - array of objects
 */
function CSVToJSON(data: string, delimiter = ','): Record<string, string>[] {
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
