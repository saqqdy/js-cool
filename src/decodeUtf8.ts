/**
 * Decoding Utf8
 *
 * @since 1.0.1
 * @param input - the string to be decoded
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
