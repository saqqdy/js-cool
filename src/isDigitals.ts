/**
 * Whether or not it is a string consisting of numbers
 *
 * @param str - the string to be tested
 * @returns returns true/false
 */
function isDigitals(str: any): boolean {
	return /^[0-9]*$/.test(str)
}

export default isDigitals
