/**
 * Remove all attributes of HTML tags
 *
 * @example
 * ```js
 * clearAttr('<div class="container" id="main">content</div>')
 * // '<div>content</div>'
 *
 * clearAttr('<a href="https://example.com" target="_blank">link</a>')
 * // '<a>link</a>'
 *
 * clearAttr('<input type="text" name="username" required>')
 * // '<input>'
 *
 * clearAttr('<span style="color:red" data-id="123">text</span>')
 * // '<span>text</span>'
 * ```
 * @since 1.0.1
 * @param string - pass in the string
 * @returns newString
 */
function clearAttr(string: string): string {
	return string.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g, '<$1>')
}

export default clearAttr
