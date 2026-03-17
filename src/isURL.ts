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
 * @since 5.24.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid URL
 */
function isURL(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}
	try {
		const url = new URL(value)
		return ['http:', 'https:', 'ftp:', 'ftps:'].includes(url.protocol)
	} catch {
		return false
	}
}

export default isURL
