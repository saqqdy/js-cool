/**
 * Whether or not it is a string consisting of numbers
 *
 * @deprecated will be removed in the next major release.
 * @since 1.0.1
 * @param str - the string to be tested
 * @returns - true/false
 */
function isDigitals(str: string): boolean {
	return /^[0-9]*$/.test(str)
}

export default isDigitals
