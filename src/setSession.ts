export interface SessionData<T = unknown> {
	value: T
	expires?: number
}

/**
 * Write value to sessionStorage with optional expiration
 *
 * @example
 * ```js
 * // Set boolean
 * setSession('boolean', true)
 *
 * // Set object
 * setSession('object', { name: 'saqqdy' })
 *
 * // Set number
 * setSession('number', 666)
 *
 * // Set with expiration (20 seconds)
 * setSession('temp', 'value', 20)
 *
 * // Set array
 * setSession('list', [1, 2, 3])
 *
 * // String expiration time
 * setSession('key', 'value', '30')
 * ```
 * @since 1.0.2
 * @param name - session storage key
 * @param value - value to store (any type, will be JSON serialized)
 * @param seconds - optional expiration time in seconds
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
