/**
 * Converts string to snake case.
 *
 * @example
 * ```ts
 * snakeCase('Foo Bar')
 * // => 'foo_bar'
 *
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * snakeCase('fooBarBaz')
 * // => 'foo_bar_baz'
 * ```
 *
 * @since 5.24.0
 * @param str - The string to convert
 * @returns - Returns the snake case string
 */
function snakeCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	// Handle camelCase, PascalCase, kebab-case, spaces, and other separators
	return str
		.replace(/([a-z])([A-Z])/g, '$1_$2') // camelCase to snake_case
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') // ABCDef to AB_CDef
		.replace(/[\s-]+/g, '_') // spaces and hyphens to underscores
		.replace(/\W/g, '_') // other non-alphanumeric to underscores
		.replace(/_+/g, '_') // multiple underscores to single
		.replace(/^_|_$/g, '') // remove leading/trailing underscores
		.toLowerCase()
}

export default snakeCase
