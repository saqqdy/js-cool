/**
 * Decoding Utf8
 *
 * @example
 * ```js
 * // Basic usage
 * decodeUtf8('Hello World')
 * // 'Hello World'
 *
 * // Decode UTF-8 encoded string
 * decodeUtf8('\xc3\xa4\xc2\xbd\xc2\xa0\xc3\xa5\xc2\xa5\xc2\xbd')
 * // '你好'
 *
 * // Decode mixed content
 * decodeUtf8('Hello\xc3\xa4\xc2\xb8\xe2\x80\x93\xc3\xa7\xe2\x80\xa2\xc5\x92')
 * // 'Hello世界'
 * ```
 * @since 1.0.1
 * @param utftext - the string to be decoded
 * @returns decoded string
 */
function decodeUtf8(utftext: string) {
	let string = '',
		i = 0,
		c = 0,
		// c1 = 0,
		c2 = 0,
		c3 = 0
	while (i < utftext.length) {
		c = utftext.charCodeAt(i)
		if (c < 128) {
			string += String.fromCharCode(c)
			i++
		} else if (c > 191 && c < 224) {
			c2 = utftext.charCodeAt(i + 1)
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
			i += 2
		} else {
			c2 = utftext.charCodeAt(i + 1)
			c3 = utftext.charCodeAt(i + 2)
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
			i += 3
		}
	}
	return string
}

export default decodeUtf8
