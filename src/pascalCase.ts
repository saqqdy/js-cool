import words from './words'

/**
 * Converts string to PascalCase.
 *
 * @example
 * ```ts
 * pascalCase('foo-bar')
 * // => 'FooBar'
 *
 * pascalCase('foo_bar')
 * // => 'FooBar'
 *
 * pascalCase('foo bar')
 * // => 'FooBar'
 *
 * pascalCase('fooBar')
 * // => 'FooBar'
 *
 * pascalCase('FooBar')
 * // => 'FooBar'
 *
 * pascalCase('XML-parser')
 * // => 'XmlParser'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to convert
 * @returns - Returns the PascalCase string
 */
function pascalCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	return words(str)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('')
}

export default pascalCase
