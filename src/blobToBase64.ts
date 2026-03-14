/**
 * blob to base64
 *
 * @example
 * ```js
 * // Basic usage
 * const blob = new Blob(['Hello'], { type: 'text/plain' })
 * const base64 = await blobToBase64(blob)
 * // 'data:text/plain;base64,SGVsbG8='
 *
 * // With image blob
 * const imageBlob = await fetch('image.png').then(r => r.blob())
 * const imageBase64 = await blobToBase64(imageBlob)
 * // 'data:image/png;base64,iVBORw0KGgo...'
 *
 * // Use in img src
 * const img = document.createElement('img')
 * img.src = await blobToBase64(blob)
 * ```
 * @since 5.13.0
 * @param input - blob data
 * @returns - base64 string promise
 */
function blobToBase64(input: Blob): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = reject
		reader.readAsDataURL(input)
	})
}

export default blobToBase64
