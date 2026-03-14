/**
 * Converts humped strings to -spaced and all lowercase Dash pattern
 *
 * @example
 * ```js
 * camel2Dash('fontSize')
 * // 'font-size'
 *
 * camel2Dash('backgroundColor')
 * // 'background-color'
 *
 * camel2Dash('marginTop')
 * // 'margin-top'
 *
 * camel2Dash('borderTopLeftRadius')
 * // 'border-top-left-radius'
 * ```
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
