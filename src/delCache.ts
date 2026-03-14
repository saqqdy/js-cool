/**
 * Delete localStorage
 *
 * @example
 * ```js
 * // Delete single item
 * setCache('token', 'xxx')
 * delCache('token')
 * getCache('token') // null
 *
 * // Delete multiple items
 * delCache('user')
 * delCache('settings')
 * ```
 * @since 1.0.2
 * @param name - cache name to delete
 */
function delCache(name: string) {
	localStorage.removeItem(name)
}

export default delCache
