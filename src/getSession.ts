/**
 * Read sessionStorage value
 *
 * @example
 * ```js
 * // Set values first
 * setSession('data1', 100)
 * setSession('data2', { a: 10 })
 * setSession('data3', null)
 *
 * // Get values
 * getSession('data1') // 100
 * getSession('data2') // { a: 10 }
 * getSession('data3') // null
 *
 * // Non-existent key returns null
 * getSession('data4') // null
 *
 * // With expiration
 * setSession('temp', 'value', 10) // expires in 10 seconds
 * getSession('temp') // 'value' (within 10s) or null (after 10s)
 * ```
 * @since 1.0.2
 * @param name - session storage key
 * @returns - stored value (parsed if JSON), or null if not found/expired
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
