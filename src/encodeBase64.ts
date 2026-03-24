import encodeUtf8 from './encodeUtf8'
import { isNumberNaN } from './_compat'

const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

/**
 * String, number to base64
 *
 * @example
 * ```js
 * // Basic usage
 * encodeBase64('Hello World')
 * // 'SGVsbG8gV29ybGQ='
 *
 * // Encode Chinese characters
 * encodeBase64('你好')
 * // '5L2g5aW9'
 *
 * // Encode JSON string
 * encodeBase64('{"name":"John"}')
 * // 'eyJuYW1lIjoiSm9obiJ9'
 *
 * // Encode with special characters
 * encodeBase64('<?xml version="1.0"?>')
 * // 'PD94bWwgdmVyc2lvbj0iMS4wIj8+'
 * ```
 * @since 1.0.1
 * @param input - the string to be encoded
 * @returns - the BASE64 encoding
 */
function encodeBase64(input: string): string {
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
		if (isNumberNaN(chr2)) {
			enc3 = enc4 = 64
		} else if (isNumberNaN(chr3)) {
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
