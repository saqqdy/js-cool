/**
 * Delete sessionStorage
 *
 * @param name - name
 */
function delSession(name: string) {
	sessionStorage.removeItem(name)
}

export default delSession
