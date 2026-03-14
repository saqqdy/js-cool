/**
 * Whether or not it is a string consisting of numbers
 *
 * @example
 * ```js
 * // Pure numbers
 * isDigitals('12345')    // true
 * isDigitals('0')        // true
 *
 * // Not pure numbers
 * isDigitals('123abc')   // false
 * isDigitals('12.34')    // false
 * isDigitals('')         // true (empty string)
 * isDigitals('-123')     // false
 * ```
 * @deprecated will be removed in the next major release.
 * @since 1.0.1
 * @param str - the string to be tested
 * @returns - true/false
 */
function isDigitals(str: string): boolean {
	return /^[0-9]*$/.test(str)
}

export default isDigitals
