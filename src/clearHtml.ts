/**
 * Removing HTML tags
 *
 * @example
 * ```js
 * clearHtml('<div>Hello <b>World</b></div>')
 * // 'Hello World'
 *
 * clearHtml('<p>Paragraph with <a href="#">link</a></p>')
 * // 'Paragraph with link'
 *
 * clearHtml('<h1>Title</h1><p>Content</p>')
 * // 'TitleContent'
 *
 * clearHtml('<div>\n  Multiple\n  Lines\n</div>')
 * // 'MultipleLines'
 * ```
 * @since 1.0.1
 * @param string - string with html tags
 * @returns newString
 */
function clearHtml(string: string) {
	return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '')
}

export default clearHtml
