/**
 * Remove leading and trailing spaces from strings
 *
 * @deprecated will be removed in the next major release.
 * @since 1.0.1
 * @param string - pass in the string
 * @returns - the new string
 */
function trim(string: string): string {
	return string.replace(/(^\s+)|(\s+$)/g, '')
}

export default trim
