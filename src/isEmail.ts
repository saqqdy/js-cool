/**
 * Check if string is a valid email address
 *
 * @example
 * ```ts
 * isEmail('test@example.com')
 * // => true
 *
 * isEmail('test.name@example.co.uk')
 * // => true
 *
 * isEmail('invalid-email')
 * // => false
 *
 * isEmail('test@')
 * // => false
 * ```
 *
 * @since 6.0.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid email
 */
function isEmail(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(value)
}

export default isEmail
