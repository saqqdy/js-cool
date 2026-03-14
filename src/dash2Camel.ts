/**
 * Converts -spaced and all lowercase Dash patterns to humped strings
 *
 * @example
 * ```js
 * dash2Camel('font-size')
 * // 'fontSize'
 *
 * dash2Camel('background-color')
 * // 'backgroundColor'
 *
 * dash2Camel('margin-top')
 * // 'marginTop'
 *
 * dash2Camel('border-top-left-radius')
 * // 'borderTopLeftRadius'
 * ```
 * @since 1.0.1
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
