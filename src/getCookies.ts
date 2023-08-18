/**
 * Read all cookies
 *
 * @example
 * ```js
 * getCookies()
 * // \{ token: 'xxx', name: 'saqqdy' \}
 * ```
 * @returns - the cookie values
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
