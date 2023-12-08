/**
 * Read sessionStorage
 *
 * @example
 * ```js
 * const data1 = 100
 * const data2 = { a: 10 }
 * const data3 = null
 *
 * setSession('data1', data1)
 * setSession('data2', data2)
 * setSession('data3', data3)
 *
 * getSession('data1') // 100
 * getSession('data2') // {a:10}
 * getSession('data3') // null
 *
 * getSession('data4') // null
 * ```
 * @since 1.0.2
 * @param name - name
 * @returns - sessionStorage
 */
function getSession(name: string): any {
	const data = sessionStorage.getItem(name)

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

export default getSession
