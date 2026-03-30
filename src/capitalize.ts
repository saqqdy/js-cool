/**
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * @example
 * ```js
 * capitalize('FRED')
 * // 'Fred'
 *
 * capitalize('hello world')
 * // 'Hello world'
 *
 * capitalize('HELLO WORLD')
 * // 'Hello world'
 *
 * capitalize('')
 * // ''
 *
 * capitalize('a')
 * // 'A'
 * ```
 * @since 6.0.0
 * @param string - The string to capitalize
 * @returns - The capitalized string
 */
function capitalize(string: string): string {
  if (!string || typeof string !== 'string') return ''
  if (string.length === 0) return ''
  if (string.length === 1) return string.toUpperCase()
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export default capitalize
