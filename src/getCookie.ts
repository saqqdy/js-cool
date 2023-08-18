/**
 * Read cookie by name
 *
 * @example
 * ```js
 * getCookie('data1')
 * // 100
 * ```
 * @param name - cookie name
 * @returns - the cookie string
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
