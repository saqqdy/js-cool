/**
 * Read cookies
 *
 * @param name - cookie name
 * @returns returns the cookie string
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
