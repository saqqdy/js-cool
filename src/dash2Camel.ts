/**
 * Converts -spaced and all lowercase Dash patterns to humped strings
 *
 * @param string - the string to be converted
 * @returns - the converted string
 */
function dash2Camel(string: string) {
	return string.replace(/[\-]{1,1}([a-z]{1,1})/g, function () {
		// eslint-disable-next-line prefer-rest-params
		return arguments[1].toLocaleUpperCase()
	})
}

export default dash2Camel
