import getCookie from './getCookie'

/**
 * Delete cookie
 *
 * @example
 * ```js
 * // Delete single cookie
 * setCookie('token', 'xxx')
 * delCookie('token')
 * getCookie('token') // null
 *
 * // Delete multiple cookies
 * delCookie('sessionId')
 * delCookie('userId')
 * ```
 * @since 1.0.2
 * @param name - cookie name to delete
 */
function delCookie(name: string) {
	const e = new Date()
	e.setTime(e.getTime() - 1)
	const cval = getCookie(name)
	if (cval !== null) {
		document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/'
	}
}

export default delCookie
