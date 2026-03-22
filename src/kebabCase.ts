/**
 * Converts string to kebab case.
 *
 * @example
 * ```ts
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 *
 * kebabCase('fooBarBaz')
 * // => 'foo-bar-baz'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @returns - Returns the kebab case string
 */
function kebabCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	// Handle camelCase, PascalCase, snake_case, spaces, and other separators
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab-case
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // ABCDef to AB-CDef
		.replace(/[\s_]+/g, '-') // spaces and underscores to hyphens
		.replace(/[^a-zA-Z0-9-]/g, '-') // other non-alphanumeric to hyphens
		.replace(/-+/g, '-') // multiple hyphens to single
		.replace(/^-|-$/g, '') // remove leading/trailing hyphens
		.toLowerCase()
}

export default kebabCase
