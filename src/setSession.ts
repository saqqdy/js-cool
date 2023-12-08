export interface SessionData<T = unknown> {
	value: T
	expires?: number
}

/**
 * Write sessionStorage
 *
 * @example
 * ```js
 * // set boolean
 * setSession('boolean', true)
 *
 * // set object
 * setSession('object', { name: 'saqqdy' })
 *
 * // set number, expires in 20 seconds
 * setSession('number', 666, 20)
 * ```
 * @since 1.0.2
 * @param name - name
 * @param value - Set the value to be stored, either as an object or as a string
 * @param seconds - the valid time
 */
function setSession<T = unknown>(name: string, value: T, seconds?: number | string) {
	if (typeof seconds === 'string') seconds = parseInt(seconds)

	const expires = seconds ? new Date().getTime() + seconds * 1000 : undefined

	const data = {
		value,
		expires
	}

	sessionStorage.setItem(name, JSON.stringify(data))
}

export default setSession
