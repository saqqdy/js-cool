/**
 * Escaping HTML Special Characters
 *
 * @param string - string with html tags
 * @returns - newString
 */
function escape(string: string) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}
	return string.replace(/[&<>"']/g, m => map[m as keyof typeof map])
}

export default escape
