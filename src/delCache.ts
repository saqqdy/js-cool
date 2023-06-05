/**
 * Delete localStorage
 *
 * @param name - name
 */
function delCache(name: string) {
	localStorage.removeItem(name)
}

export default delCache
