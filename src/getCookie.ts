/**
 * Read cookie by name
 *
 * @example
 * ```js
 * // Set cookie first
 * setCookie('token', 'abc123')
 *
 * // Get cookie value
 * getCookie('token')
 * // 'abc123'
 *
 * // Non-existent cookie
 * getCookie('nonexistent')
 * // null
 *
 * // Multiple cookies
 * setCookie('user', 'john')
 * getCookie('user') // 'john'
 * getCookie('token') // 'abc123'
 * ```
 * @since 1.0.2
 * @param name - cookie name
 * @returns - cookie value string or null if not found
 */
function getCookie(name: string): any {
	const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	const arr = document.cookie.match(reg)
	if (arr) {
		return decodeURIComponent(arr[2])
	} else {
		return null
	}
}

export default getCookie
