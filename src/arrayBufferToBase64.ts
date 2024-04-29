/**
 * arrayBuffer to base64
 *
 * @example
 * ```js
 * arrayBufferToBase64(arrayBuffer, 'image/png')
 * // data:image/png;base64,xxxxxxxxxxxx
 * 
 * arrayBufferToBase64(arrayBuffer)
 * // xxxxxxxxxxxx
 * ```
 * @since 5.13.0
 * @param input - arrayBuffer
 * @param mime - image mime, eq: image/png
 * @returns - base64
 */
function arrayBufferToBase64(input: ArrayBuffer, mime?: string) {
	const u8Array = String.fromCharCode(...new Uint8Array(input))
	return mime ? `data:${mime};base64,${btoa(u8Array)}` : btoa(u8Array)
}

export default arrayBufferToBase64
