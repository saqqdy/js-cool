/**
 * Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
 *
 * @param name - cache name
 * @returns returns data, if it's an object, it's also an object
 */
function getCache(name: string): any {
	const str = localStorage.getItem(name)
	const exp = new Date()
	let o
	if (str) {
		try {
			o = JSON.parse(str)
		} catch (err) {
			o = str
		}
		if (typeof o !== 'object') return o
		if (!o.value) return null
		if (!o.expires || o.expires > exp.getTime()) {
			return o.value
		}
		localStorage.removeItem(name)
		return null
	}
	return null
}

export default getCache
