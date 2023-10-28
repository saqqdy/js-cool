import blobToBase64 from './blobToBase64'

/**
 * file to base64
 *
 * @param input - file data
 * @returns - base64 string
 */
function fileToBase64(input: File): Promise<string | null> {
	return blobToBase64(input)
}

export default fileToBase64
