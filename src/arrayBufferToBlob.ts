/**
 * arrayBuffer to blob
 *
 * @example
 * ```js
 * // Basic usage
 * const buffer = new ArrayBuffer(8)
 * const blob = arrayBufferToBlob(buffer)
 * // Blob { size: 8, type: 'image/png' }
 *
 * // With custom mime type
 * const jsonBlob = arrayBufferToBlob(buffer, 'application/json')
 * // Blob { size: 8, type: 'application/json' }
 *
 * // With image/jpeg
 * const jpegBlob = arrayBufferToBlob(buffer, 'image/jpeg')
 * ```
 * @since 5.13.0
 * @param input - arrayBuffer
 * @param mime - image mime, default: image/png
 * @returns - blob
 */
function arrayBufferToBlob(input: ArrayBuffer, mime = 'image/png') {
	return new Blob([input], { type: mime })
}

export default arrayBufferToBlob
