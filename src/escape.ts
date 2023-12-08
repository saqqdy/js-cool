/**
 * Escaping HTML Special Characters
 *
 * @example
 * ```js
 * escape('<div>test<br />string</div>')
 * // '&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;'
 * ```
 * @since 5.5.0
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
