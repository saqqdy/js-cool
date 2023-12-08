import getCookie from './getCookie'

/**
 * Delete cookie
 *
 * @since 1.0.2
 * @param name - cookie name
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
