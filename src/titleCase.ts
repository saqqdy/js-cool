import words from './words'

/**
 * Converts string to Title Case.
 *
 * @example
 * ```ts
 * titleCase('hello world')
 * // => 'Hello World'
 *
 * titleCase('foo-bar-baz')
 * // => 'Foo Bar Baz'
 *
 * titleCase('foo_bar_baz')
 * // => 'Foo Bar Baz'
 *
 * titleCase('fooBarBaz')
 * // => 'Foo Bar Baz'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @returns - Returns the Title Case string
 */
function titleCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	return words(str)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ')
}

export default titleCase
