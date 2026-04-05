import words from './words'

/**
 * Converts string to dot.case.
 *
 * @example
 * ```ts
 * dotCase('fooBar')
 * // => 'foo.bar'
 *
 * dotCase('foo-bar')
 * // => 'foo.bar'
 *
 * dotCase('foo_bar')
 * // => 'foo.bar'
 *
 * dotCase('foo bar')
 * // => 'foo.bar'
 *
 * dotCase('FooBar')
 * // => 'foo.bar'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @returns - Returns the dot.case string
 */
function dotCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	return words(str)
		.map((word) => word.toLowerCase())
		.join('.')
}

export default dotCase
