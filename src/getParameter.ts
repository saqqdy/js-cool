/**
 * Get a single URL parameter
 *
 * @param name - name
 * @returns return parameter value
 */
function getParameter(name: string): string | null {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	const r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

export default getParameter
