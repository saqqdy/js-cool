/**
 * arrayBuffer to blob
 *
 * @since 5.13.0
 * @param input - arrayBuffer
 * @param mime - image mime, default: image/png
 * @returns - blob
 */
function arrayBufferToBlob(input: ArrayBuffer, mime = 'image/png') {
	return new Blob([input], { type: mime })
}

export default arrayBufferToBlob
