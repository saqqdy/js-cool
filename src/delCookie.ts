import getCookie from './getCookie'

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

export default delCookie
