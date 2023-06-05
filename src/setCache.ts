export interface CacheData {
	value: any
	expires: number | string
}

/**
 * Get the cache, if the deposited is Object, the retrieved is also Object, no need to convert again
 *
 * @param name - cache name
 * @param value - cache data, can be passed directly into Object
 * @param seconds - cache time (seconds)
 * @returns returns the data, if it is stored in Object, it is also taken out as Object
 */
function setCache(name: string, value: any, seconds: number) {
	const e = new Date()
	const expires = seconds ? e.getTime() + seconds * 1000 : ''
	const o = {} as CacheData
	o.value = value
	o.expires = expires
	localStorage.setItem(name, JSON.stringify(o))
}

export default setCache
