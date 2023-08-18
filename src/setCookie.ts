/**
 * setCookie method for writing cookies
 *
 * @example
 * ```js
 * // expires in 86400 seconds
 * setCookie('token', 'xxxxxx')
 *
 * // set to path
 * setCookie('token', 'xxxxxx', 20, '/app')
 *
 * // enable samesite
 * setCookie('number', 666, 20, '/', false)
 * ```
 * @param name - cookie name
 * @param value - Set the value to be stored, either as an object or as a string
 * @param seconds - cookie validity default 1 day
 * @param path - path, default '/'
 * @param samesite - SameSite, default true
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
