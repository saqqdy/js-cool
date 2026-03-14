/**
 * Get the number in the string
 *
 * @example
 * ```js
 * // Version number
 * getNumber('Chrome123.33')
 * // '123.33'
 *
 * // Mixed with letters
 * getNumber('234test.88')
 * // '234.88'
 *
 * // Multiple numbers
 * getNumber('a1b2c3')
 * // '123'
 *
 * // With decimal
 * getNumber('Price: $99.99')
 * // '99.99'
 *
 * // No numbers
 * getNumber('hello world')
 * // ''
 * ```
 * @since 1.0.1
 * @param string - pass in a string with a number
 * @returns - a pure numeric string
 */
function getNumber(string: string): string {
	return string.replace(/[^0-9.]/gi, '')
}

export default getNumber
