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
 *
 * camel2Dash('XMLParser')
 * // 'xml-parser'
 *
 * camel2Dash('HTMLElement')
 * // 'html-element'
 *
 * camel2Dash('HTTPSConnection')
 * // 'https-connection'
 * ```
 * @since 1.0.1
 * @param string - the string to be converted
 * @returns - the converted string
 */
function camel2Dash(string: string): string {
	return string
		.replace(/([a-z])([A-Z])/g, '$1-$2')      // camelCase split: fooBar → foo-Bar
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // consecutive uppercase: XMLParser → XML-Parser
		.replace(/^-/, '')
		.toLocaleLowerCase()
}

export default camel2Dash
