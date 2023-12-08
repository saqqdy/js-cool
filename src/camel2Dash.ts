/**
 * Converts humped strings to -spaced and all lowercase Dash pattern
 *
 * @since 1.0.1
 * @param string - the string to be converted
 * @returns - the converted string
 */
function camel2Dash(string: string) {
	return string
		.replace(/([A-Z]{1,1})/g, '-$1')
		.replace(/^-/, '')
		.toLocaleLowerCase()
}

export default camel2Dash
