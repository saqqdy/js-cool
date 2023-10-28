import base64ToArrayBuffer from './base64ToArrayBuffer'

/**
 * base64 to file
 *
 * @param input - base64 string
 * @param fileName - file name
 * @returns - the BASE64 encoding
 */
function base64ToFile(input: string, fileName: string): File {
	const [pre] = input.split(',')
	if (!pre) throw new Error('Not a valid base64')

	const mime = pre.match(/:(.*?);/)?.[1]
	const arrayBuffer = base64ToArrayBuffer(input)

	return new File([arrayBuffer], fileName, { type: mime })
}

export default base64ToFile
