/**
 * Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
 *
 * @example
 * ```js
 * const data1 = 100
 * const data2 = { a: 10 }
 * const data3 = null
 *
 * setCache('data1', data1)
 * setCache('data2', data2)
 * setCache('data3', data3)
 *
 * getCache('data1') // 100
 * getCache('data2') // {a:10}
 * getCache('data3') // null
 *
 * getCache('data4') // null
 * ```
 * @since 1.0.2
 * @param name - cache name
 * @returns - data, if it's an object, it's also an object
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
