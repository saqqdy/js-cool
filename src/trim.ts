/**
 * Remove leading and trailing spaces from strings
 *
 * @deprecated
 * @param string - pass in the string
 * @returns returns the new string
 */
function trim(string: string): string {
	return string.replace(/(^\s+)|(\s+$)/g, '')
}

export default trim
