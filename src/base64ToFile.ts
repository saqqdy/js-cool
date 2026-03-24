import base64ToArrayBuffer from './base64ToArrayBuffer'
import { createFile } from './_compat'

/**
 * base64 to file
 *
 * @example
 * ```js
 * // Basic usage
 * const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
 * const file = base64ToFile(base64, 'image.png')
 * // File { name: 'image.png', size: 67, type: 'image/png' }
 *
 * // Create file for upload
 * const jpegBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'
 * const jpegFile = base64ToFile(jpegBase64, 'photo.jpg')
 *
 * // Use with FormData
 * const formData = new FormData()
 * formData.append('file', file)
 * ```
 * @since 5.13.0
 * @param input - base64 string
 * @param fileName - file name
 * @returns - file object (File in modern browsers, Blob in IE11)
 */
function base64ToFile(input: string, fileName: string): File | Blob {
	const [pre] = input.split(',')

	if (!pre) throw new Error('Not a valid base64')

	const mime = pre.match(/:(.*?);/)?.[1]
	const arrayBuffer = base64ToArrayBuffer(input)

	// eslint-disable-next-line no-undef
	return createFile([arrayBuffer as BlobPart], fileName, { type: mime })
}

export default base64ToFile
