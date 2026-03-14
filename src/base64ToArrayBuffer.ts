import inBrowser from './inBrowser'

/**
 * base64 to arrayBuffer
 *
 * @example
 * ```js
 * // Basic usage
 * const base64 = 'SGVsbG8gV29ybGQ='
 * const buffer = base64ToArrayBuffer(base64)
 * // Uint8Array(11) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
 *
 * // With data URL
 * const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...'
 * const imageBuffer = base64ToArrayBuffer(dataUrl)
 *
 * // Use with TextDecoder
 * const decoder = new TextDecoder()
 * const text = decoder.decode(base64ToArrayBuffer('SGVsbG8='))
 * // 'Hello'
 * ```
 * @since 5.13.0
 * @param input - base64 string (with or without data URL prefix)
 * @returns - arrayBuffer (Uint8Array in browser, Buffer in Node.js)
 */
function base64ToArrayBuffer(input: string) {
	let [pre, data] = input.split(',')

	if (!pre) throw new Error('Not a valid base64')
	else if (!data) {
		data = pre
		pre = ''
	}

	if (inBrowser) {
		const bstr = atob(data)
		let len = bstr.length
		const u8Array = new Uint8Array(len)
		while (len--) {
			u8Array[len] = bstr.charCodeAt(len)
		}
		return u8Array
	}
	return Buffer.from(data, 'base64')
}

export default base64ToArrayBuffer
