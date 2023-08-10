/**
 * Restore HTML Special Characters
 *
 * @param string - string
 * @returns - newString
 */
function unescape(string: string) {
	const map = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'"
	}
	return string.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => map[m as keyof typeof map])
}

export default unescape
