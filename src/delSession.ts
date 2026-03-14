/**
 * Delete sessionStorage
 *
 * @example
 * ```js
 * // Delete single item
 * setSession('tempData', 'value')
 * delSession('tempData')
 * getSession('tempData') // null
 *
 * // Delete multiple items
 * delSession('formData')
 * delSession('wizard')
 * ```
 * @since 1.0.2
 * @param name - session name to delete
 */
function delSession(name: string) {
	sessionStorage.removeItem(name)
}

export default delSession
