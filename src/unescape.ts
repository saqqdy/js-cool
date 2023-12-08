/**
 * Restore HTML Special Characters
 *
 * @example
 * ```js
 * unescape('&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;')
 * // '<div>test<br />string</div>'
 * ```
 * @since 5.5.0
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
