/**
 * Get the number in the string
 *
 * @example
 * ```js
 * getNumber('Chrome123.33')
 * // '123.33'.
 *
 * getNumber('234test.88')
 * // '234.88'.
 * ```
 * @since 1.0.1
 * @param string - pass in a string with a number
 * @returns - a pure numeric string
 */
function getNumber(string: string): string {
	return string.replace(/[^0-9.]/gi, '')
}

export default getNumber
