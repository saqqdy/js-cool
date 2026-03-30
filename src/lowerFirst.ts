/**
 * Converts the first character of string to lower case.
 *
 * @example
 * ```js
 * lowerFirst('Fred')
 * // 'fred'
 *
 * lowerFirst('FRED')
 * // 'fRED'
 *
 * lowerFirst('hello')
 * // 'hello'
 *
 * lowerFirst('')
 * // ''
 * ```
 * @since 6.0.0
 * @param string - The string to convert
 * @returns - The converted string
 */
function lowerFirst(string: string): string {
  if (!string || typeof string !== 'string') return ''
  if (string.length === 0) return ''
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export default lowerFirst
