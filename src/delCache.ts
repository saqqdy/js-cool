/**
 * Delete localStorage
 *
 * @since 1.0.2
 * @param name - name
 */
function delCache(name: string) {
	localStorage.removeItem(name)
}

export default delCache
