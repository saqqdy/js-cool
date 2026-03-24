/**
 * Check if string is a valid URL
 *
 * @example
 * ```ts
 * isURL('https://example.com')
 * // => true
 *
 * isURL('http://localhost:3000/path?query=1')
 * // => true
 *
 * isURL('ftp://ftp.example.com')
 * // => true
 *
 * isURL('invalid-url')
 * // => false
 *
 * isURL('example.com')
 * // => false (missing protocol)
 * ```
 *
 * @since 6.0.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid URL
 */
function isURL(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}

	// Use native URL API if available (IE11 doesn't support it in all cases)
	if (typeof URL !== 'undefined') {
		try {
			const url = new URL(value)
			return ['http:', 'https:', 'ftp:', 'ftps:'].indexOf(url.protocol) !== -1
		} catch {
			return false
		}
	}

	// Fallback: regex validation for IE11
	return /^(https?|ftp|ftps):\/\/[^\s/$.?#].[^\s]*$/i.test(value)
}

export default isURL
