/**
 * Removing HTML tags
 *
 * @param string - string with html tags
 * @returns newString
 */
function clearHtml(string: string) {
	return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '')
}

export default clearHtml
