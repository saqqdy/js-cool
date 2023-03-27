/**
 * 删除cookie
 *
 * @param name - cookie名称
 */
export function delCookie(name: string) {
	const e = new Date()
	e.setTime(e.getTime() - 1)
	const cval = getCookie(name)
	if (cval !== null) {
		document.cookie = name + '=' + cval + ';expires=' + e.toUTCString() + ';path=/'
	}
}

/**
 * 读取cookies
 *
 * @param name - cookie名称
 * @returns 返回cookie字符串
 */
export function getCookie(name: string): any {
	const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	const arr = document.cookie.match(reg)
	if (arr) {
		return decodeURIComponent(arr[2])
	} else {
		return null
	}
}

/**
 * setCookie写入cookie的方法
 *
 * @param name - cookie名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - cookie有效时间默认1天
 * @param path - 路径，默认'/'
 * @param samesite - SameSite，默认true
 */
export function setCookie(name: string, value: any, seconds = 86400, path = '/', samesite = true) {
	const exp: Date = new Date()
	exp.setTime(exp.getTime() + seconds * 1000)
	document.cookie =
		name +
		'=' +
		encodeURIComponent(value) +
		';expires=' +
		exp.toUTCString() +
		';path=' +
		path +
		(samesite && location.protocol === 'https:' ? ';SameSite=None;Secure' : '')
}

export default {
	delCookie,
	getCookie,
	setCookie
}
