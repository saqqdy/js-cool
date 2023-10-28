/**
 * arrayBuffer to base64
 *
 * @param input - arrayBuffer
 * @param mime - image mime, default: image/png
 * @returns - base64
 */
function arrayBufferToBase64(input: ArrayBuffer, mime = 'image/png') {
	const u8Array = String.fromCharCode(...new Uint8Array(input))
	return `data:${mime};base64,${btoa(u8Array)}`
}

export default arrayBufferToBase64
