/**
 * blob to arrayBuffer
 *
 * @since 5.13.0
 * @param input - blob data
 * @returns - arrayBuffer
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
