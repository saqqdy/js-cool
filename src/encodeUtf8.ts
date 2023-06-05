/**
 * Encoding Utf8
 *
 * @param input - the string to be encoded
 * @returns returns the UTF-8 encoding
 */
function encodeUtf8(string: string) {
	string = string.replace(/\r\n/g, '\n')
	let utftext = ''
	for (let n = 0; n < string.length; n++) {
		const c = string.charCodeAt(n)
		if (c < 128) {
			utftext += String.fromCharCode(c)
		} else if (c > 127 && c < 2048) {
			utftext += String.fromCharCode((c >> 6) | 192)
			utftext += String.fromCharCode((c & 63) | 128)
		} else {
			utftext += String.fromCharCode((c >> 12) | 224)
			utftext += String.fromCharCode(((c >> 6) & 63) | 128)
			utftext += String.fromCharCode((c & 63) | 128)
		}
	}
	return utftext
}

export default encodeUtf8
