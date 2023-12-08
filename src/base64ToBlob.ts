import base64ToArrayBuffer from './base64ToArrayBuffer'

/**
 * base64 to blob
 *
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
