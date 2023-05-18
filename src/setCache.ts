export interface CacheData {
	value: any
	expires: number | string
}

/**
 * 获取缓存，存入的如果是Object，取出的也是Object，不需要再转换
 *
 * @param name - 缓存名称
 * @param value - 缓存数据，可以直接传入Object
 * @param seconds -缓存时间（秒）
 * @returns 返回数据，存的如果是对象，取出的也是对象
 */
export function setCache(name: string, value: any, seconds: number) {
	const e = new Date()
	const expires = seconds ? e.getTime() + seconds * 1000 : ''
	const o = {} as CacheData
	o.value = value
	o.expires = expires
	localStorage.setItem(name, JSON.stringify(o))
}

export default setCache
