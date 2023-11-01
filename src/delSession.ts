/**
 * Delete sessionStorage
 *
 * @since 1.0.2
 * @param name - name
 */
function delSession(name: string) {
	sessionStorage.removeItem(name)
}

export default delSession
