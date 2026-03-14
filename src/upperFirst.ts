/**
 * First letter capitalized
 *
 * @example
 * ```js
 * // Basic usage
 * upperFirst('saqqdy')
 * // 'Saqqdy'
 *
 * // Single character
 * upperFirst('a')
 * // 'A'
 *
 * // Already capitalized
 * upperFirst('Hello')
 * // 'Hello'
 *
 * // Empty string
 * upperFirst('')
 * // ''
 *
 * // With numbers
 * upperFirst('1test')
 * // '1test'
 * ```
 * @since 1.0.1
 * @param string - the string to be converted
 * @returns - the converted string
 */
function upperFirst(string: string): string {
	return string.slice(0, 1).toLocaleUpperCase() + string.slice(1)
}

export default upperFirst
