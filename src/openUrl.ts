/**
 * Open link in new tab (file jump download if browser can't parse)
 *
 * @since 1.0.6
 * @param url - link
 */
function openUrl(url: string) {
	const dom = document.createElement('a')
	dom.style.display = 'none'
	dom.href = url
	dom.setAttribute('target', '_blank')
	document.body.appendChild(dom)
	dom.click()
	document.body.removeChild(dom)
}

export default openUrl
