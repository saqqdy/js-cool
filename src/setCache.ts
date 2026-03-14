export interface CacheData<T = unknown> {
	value: T
	expires?: number
}

/**
 * Set cache to localStorage with optional expiration
 *
 * @example
 * ```js
 * // Set boolean
 * setCache('boolean', true)
 *
 * // Set object
 * setCache('object', { name: 'saqqdy' })
 *
 * // Set number
 * setCache('number', 666)
 *
 * // Set with expiration (20 seconds)
 * setCache('temp', 'value', 20)
 *
 * // Set array
 * setCache('list', [1, 2, 3])
 *
 * // String expiration time
 * setCache('key', 'value', '30')
 * ```
 * @since 1.0.2
 * @param name - cache key name
 * @param value - value to cache (any type, will be JSON serialized)
 * @param seconds - optional expiration time in seconds
 */
function setCache<T = unknown>(name: string, value: T, seconds?: number | string) {
	if (typeof seconds === 'string') seconds = parseInt(seconds)

	const expires = seconds ? new Date().getTime() + seconds * 1000 : undefined

	const data = {
		value,
		expires
	}

	localStorage.setItem(name, JSON.stringify(data))
}

export default setCache
