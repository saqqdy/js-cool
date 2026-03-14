/**
 * Read all cookies as an object
 *
 * @example
 * ```js
 * // Set some cookies
 * setCookie('token', 'abc123')
 * setCookie('userId', '456')
 *
 * // Get all cookies
 * getCookies()
 * // { token: 'abc123', userId: '456' }
 *
 * // Empty cookies
 * document.cookie = ''
 * getCookies()
 * // {}
 *
 * // Special values are converted to empty string
 * // null, undefined, NaN values become ''
 * ```
 * @since 5.6.0
 * @returns - object with all cookie key-value pairs
 */
function getCookies() {
	const cookies: Record<string, string> = {}
	const cookieArr = decodeURIComponent(document.cookie).split('; ')
	for (let i = cookieArr.length - 1; i >= 0; i--) {
		const valPair = cookieArr[i].split('=')
		if (['null', 'undefined', 'NaN'].includes(valPair[1])) valPair[1] = ''
		cookies[valPair[0]] = valPair[1]
	}
	return cookies
}

export default getCookies
