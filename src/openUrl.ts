/**
 * Open link in new tab (file jump download if browser can't parse)
 *
 * @example
 * ```js
 * // Open URL in new tab
 * openUrl('https://example.com')
 *
 * // Download file
 * openUrl('https://example.com/files/document.pdf')
 *
 * // Open mailto link
 * openUrl('mailto:test@example.com')
 *
 * // Open tel link
 * openUrl('tel:+1234567890')
 * ```
 * @since 1.0.6
 * @param url - link to open
 */
function openUrl(url: string): void {
	const dom = document.createElement('a')

	dom.style.display = 'none'
	dom.href = url
	dom.setAttribute('target', '_blank')
	document.body.appendChild(dom)
	dom.click()
	document.body.removeChild(dom)
}

export default openUrl
