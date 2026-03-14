/**
 * Restore HTML Special Characters
 *
 * @example
 * ```js
 * // Basic usage
 * unescape('&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;')
 * // '<div>test<br />string</div>'
 *
 * // Restore quotes
 * unescape('He said &quot;Hello&quot; and &#39;Goodbye&#39;')
 * // 'He said "Hello" and \'Goodbye\''
 *
 * // Restore ampersand
 * unescape('Tom &amp; Jerry')
 * // 'Tom & Jerry'
 *
 * // Combined with escape
 * const original = '<div>Hello</div>'
 * const escaped = escape(original)
 * const restored = unescape(escaped)
 * // restored === original
 * ```
 * @since 5.5.0
 * @param string - escaped string
 * @returns - unescaped string
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
