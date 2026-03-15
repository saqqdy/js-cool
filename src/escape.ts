/**
 * Escaping HTML Special Characters
 *
 * @example
 * ```js
 * // Basic usage
 * escape('<div>test<br />string</div>')
 * // '&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;'
 *
 * // Escape quotes
 * escape('He said "Hello" and \'Goodbye\'')
 * // 'He said &quot;Hello&quot; and &#39;Goodbye&#39;'
 *
 * // Escape ampersand
 * escape('Tom & Jerry')
 * // 'Tom &amp; Jerry'
 *
 * // Prevent XSS
 * const userInput = '<script>alert("xss")</script>'
 * const safe = escape(userInput)
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 * @since 5.5.0
 * @param string - string with html special characters
 * @returns - escaped string
 */
function escape(string: string): string {
	const map = {
		'"': '&quot;',
		'&': '&amp;',
		"'": '&#39;',
		'<': '&lt;',
		'>': '&gt;',
	}

	return string.replace(/[&<>"']/g, m => map[m as keyof typeof map])
}

export default escape
