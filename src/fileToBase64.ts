import blobToBase64 from './blobToBase64'

/**
 * file to base64
 *
 * @example
 * ```js
 * // Basic usage with file input
 * const input = document.querySelector('input[type="file"]')
 * const file = input.files[0]
 * const base64 = await fileToBase64(file)
 * // 'data:image/png;base64,iVBORw0KGgo...'
 *
 * // Use for image preview
 * const preview = document.getElementById('preview')
 * preview.src = await fileToBase64(file)
 *
 * // Upload as base64
 * const formData = { image: await fileToBase64(file) }
 * fetch('/upload', { method: 'POST', body: JSON.stringify(formData) })
 * ```
 * @since 5.13.0
 * @param input - file data
 * @returns - base64 string promise
 */
function fileToBase64(input: File): Promise<string | null> {
	return blobToBase64(input)
}

export default fileToBase64
