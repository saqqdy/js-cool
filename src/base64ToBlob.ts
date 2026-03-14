import base64ToArrayBuffer from './base64ToArrayBuffer'

/**
 * base64 to blob
 *
 * @example
 * ```js
 * // Basic usage with data URL
 * const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
 * const blob = base64ToBlob(base64)
 * // Blob { size: 67, type: 'image/png' }
 *
 * // With JPEG
 * const jpegBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'
 * const jpegBlob = base64ToBlob(jpegBase64)
 * ```
 * @since 5.13.0
 * @param input - base64 string
 * @returns - blob
 */
function base64ToBlob(input: string): Blob {
	const [pre] = input.split(',')
	if (!pre) throw new Error('Not a valid base64')

	const mime = pre.match(/:(.*?);/)?.[1]
	const arrayBuffer = base64ToArrayBuffer(input)

	return new Blob([arrayBuffer], { type: mime })
}

export default base64ToBlob
