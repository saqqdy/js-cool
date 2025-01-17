import inBrowser from './inBrowser'

/**
 * base64 to arrayBuffer
 *
 * @since 5.13.0
 * @param input - base64 string
 * @returns - arrayBuffer
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
