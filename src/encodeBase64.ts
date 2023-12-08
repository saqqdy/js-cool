import encodeUtf8 from './encodeUtf8'
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * String, number to base64
 *
 * @since 1.0.1
 * @param input - the string to be encoded
 * @returns - the BASE64 encoding
 */
function encodeBase64(input: string) {
	let output = '',
		chr1,
		chr2,
		chr3,
		enc1,
		enc2,
		enc3,
		enc4,
		i = 0
	input = encodeUtf8(input)
	while (i < input.length) {
		chr1 = input.charCodeAt(i++)
		chr2 = input.charCodeAt(i++)
		chr3 = input.charCodeAt(i++)
		enc1 = chr1 >> 2
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
		enc4 = chr3 & 63
		if (isNaN(chr2)) {
			enc3 = enc4 = 64
		} else if (isNaN(chr3)) {
			enc4 = 64
		}
		output =
			output +
			_keyStr.charAt(enc1) +
			_keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) +
			_keyStr.charAt(enc4)
	}
	return output
}

export default encodeBase64
