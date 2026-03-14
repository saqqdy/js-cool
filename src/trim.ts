/**
 * Remove leading and trailing spaces from strings
 *
 * @example
 * ```js
 * // Basic usage
 * trim('  hello world  ')
 * // 'hello world'
 *
 * // Only leading spaces
 * trim('   hello')
 * // 'hello'
 *
 * // Only trailing spaces
 * trim('world   ')
 * // 'world'
 *
 * // No spaces
 * trim('no spaces')
 * // 'no spaces'
 *
 * // Note: Use String.prototype.trim() instead
 * '  hello  '.trim() // 'hello'
 * ```
 * @deprecated will be removed in the next major release. Use String.prototype.trim() instead.
 * @since 1.0.1
 * @param string - pass in the string
 * @returns - the new string
 */
function trim(string: string): string {
	return string.replace(/(^\s+)|(\s+$)/g, '')
}

export default trim
