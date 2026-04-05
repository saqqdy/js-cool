import words from './words'

/**
 * Converts string to CONSTANT_CASE.
 *
 * @example
 * ```ts
 * constantCase('foo-bar')
 * // => 'FOO_BAR'
 *
 * constantCase('foo_bar')
 * // => 'FOO_BAR'
 *
 * constantCase('foo bar')
 * // => 'FOO_BAR'
 *
 * constantCase('fooBar')
 * // => 'FOO_BAR'
 *
 * constantCase('FooBar')
 * // => 'FOO_BAR'
 *
 * constantCase('XML-parser')
 * // => 'XML_PARSER'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @returns - Returns the CONSTANT_CASE string
 */
function constantCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	return words(str)
		.map((word) => word.toUpperCase())
		.join('_')
}

export default constantCase
