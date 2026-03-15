/**
 * blob to arrayBuffer
 *
 * @example
 * ```js
 * // Basic usage
 * const blob = new Blob(['Hello World'], { type: 'text/plain' })
 * const buffer = await blobToArrayBuffer(blob)
 * // ArrayBuffer { byteLength: 11 }
 *
 * // With image blob
 * const imageBlob = await fetch('image.png').then(r => r.blob())
 * const imageBuffer = await blobToArrayBuffer(imageBlob)
 *
 * // Error handling
 * try {
 *   const result = await blobToArrayBuffer(blob)
 * } catch (error) {
 *   console.error('Conversion failed:', error)
 * }
 * ```
 * @since 5.13.0
 * @param input - blob data
 * @returns - arrayBuffer promise
 */
function blobToArrayBuffer(input: Blob): Promise<ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => resolve(reader.result as ArrayBuffer)
		reader.onerror = reject
		reader.readAsArrayBuffer(input)
	})
}

export default blobToArrayBuffer
