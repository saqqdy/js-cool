/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
function getCookie(name: string): any {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	arr = document.cookie.match(reg)
	if (arr) {
		return decodeURIComponent(arr[2])
	} else {
		return null
	}
}

export default getCookie
