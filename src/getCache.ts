/**
 * Get the cache from localStorage, if the deposited is Object, the retrieved is also Object
 *
 * @example
 * ```js
 * // Set values first
 * setCache('data1', 100)
 * setCache('data2', { a: 10 })
 * setCache('data3', null)
 *
 * // Get values
 * getCache('data1') // 100
 * getCache('data2') // { a: 10 }
 * getCache('data3') // null
 *
 * // Non-existent key returns null
 * getCache('data4') // null
 *
 * // With expiration (set with setCache)
 * setCache('temp', 'value', 10) // expires in 10 seconds
 * getCache('temp') // 'value' (within 10s) or null (after 10s)
 * ```
 * @since 1.0.2
 * @param name - cache name
 * @returns - cached data (parsed if JSON), or null if not found/expired
 */
function getCache(name: string): any {
	const data = localStorage.getItem(name)

	if (!data) return null

	try {
		const exp = new Date()
		const obj = JSON.parse(data)

		if ('value' in obj || 'expires' in obj) {
			if (!obj.expires || obj.expires > exp.getTime()) return obj.value
			sessionStorage.removeItem(name)

			return null
		}
	} catch {
		return data
	}
}

export default getCache
