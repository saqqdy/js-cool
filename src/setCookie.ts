/**
 * setCookie method for writing cookies
 *
 * @example
 * ```js
 * // Basic usage - expires in 1 day (86400 seconds)
 * setCookie('token', 'xxxxxx')
 *
 * // Custom expiration (20 seconds)
 * setCookie('session', 'abc123', 20)
 *
 * // Set to specific path
 * setCookie('token', 'xxxxxx', 86400, '/app')
 *
 * // Disable SameSite (for cross-site requests)
 * setCookie('number', 666, 20, '/', false)
 *
 * // Boolean value
 * setCookie('loggedIn', true, 3600)
 *
 * // Number value
 * setCookie('count', 42, 3600)
 * ```
 * @since 1.0.2
 * @param name - cookie name
 * @param value - cookie value (string, number, or boolean)
 * @param seconds - cookie validity in seconds (default: 86400 = 1 day)
 * @param path - cookie path (default: '/')
 * @param samesite - enable SameSite for HTTPS (default: true)
 */
function setCookie<T extends string | number | boolean>(
	name: string,
	value: T,
	seconds: string | number,
	path = '/',
	samesite = true
) {
	if (typeof seconds === 'string') seconds = parseInt(seconds)

	const _t = new Date()
	seconds ||= 86400
	_t.setTime(_t.getTime() + seconds * 1000)

	let cookieStr = `${name}=${encodeURIComponent(value)};expires=${_t.toUTCString()};path=${path}`

	if (samesite && location.protocol === 'https:') cookieStr += ';SameSite=None;Secure'

	document.cookie = cookieStr
}

export default setCookie
