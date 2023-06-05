export interface SessionData {
	value: any
	expires: number | string
}

/**
 * Write sessionStorage
 *
 * @param name - name
 * @param value - Set the value to be stored, either as an object or as a string
 * @param seconds - the valid time
 */
function setSession(name: string, value: any, seconds: number): void {
	const e = new Date()
	const expires = seconds ? e.getTime() + seconds * 1000 : ''
	const obj = {} as SessionData
	obj.value = value
	obj.expires = expires
	sessionStorage.setItem(name, JSON.stringify(obj))
}

export default setSession
