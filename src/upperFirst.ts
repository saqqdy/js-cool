/**
 * First letter capitalized
 *
 * @param string - the string to be converted
 * @returns returns the converted string
 */
function upperFirst(string: string): string {
	return string.slice(0, 1).toLocaleUpperCase() + string.slice(1)
}

export default upperFirst
