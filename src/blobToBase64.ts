/**
 * blob to base64
 *
 * @param input - blob data
 * @returns - base64 string
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
