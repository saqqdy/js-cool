export interface SessionData {
	value: any
	expires: number | string
}

/**
 * 删除sessionStorage
 *
 * @param name - 名称
 */
export function delSession(name: string) {
	sessionStorage.removeItem(name)
}

/**
 * 读取sessionStorage
 *
 * @param name - 名称
 * @returns 返回sessionStorage
 */
export function getSession(name: string): any {
	const str = sessionStorage.getItem(name)
	const exp = new Date()
	if (str) {
		const obj = JSON.parse(str)
		if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('expires')) {
			return null
		} else {
			if (!obj.expires || obj.expires > exp.getTime()) {
				return obj.value
			} else {
				sessionStorage.removeItem(name)
				return null
			}
		}
	} else {
		return null
	}
}

/**
 * 写sessionStorage
 *
 * @param name - 名称
 * @param value - 设置要存储的值，可以是对象或字符串
 * @param seconds - 有效时间
 */
export function setSession(name: string, value: any, seconds: number): void {
	const e = new Date()
	const expires = seconds ? e.getTime() + seconds * 1000 : ''
	const obj = {} as SessionData
	obj.value = value
	obj.expires = expires
	sessionStorage.setItem(name, JSON.stringify(obj))
}

export default {
	delSession,
	getSession,
	setSession
}
