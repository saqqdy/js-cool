export interface CacheData<T = unknown> {
	value: T
	expires?: number
}

/**
 * Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
 *
 * @example
 * ```js
 * // set boolean
 * setCache('boolean', true)
 *
 * // set object
 * setCache('object', { name: 'saqqdy' })
 *
 * // set number, expires in 20 seconds
 * setCache('number', 666, 20)
 * ```
 * @since 1.0.2
 * @param name - cache name
 * @param value - cache data, can be passed directly into Object
 * @param seconds - cache time (seconds)
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
