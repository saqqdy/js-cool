/**
 * blob to blobUrl
 *
 * @param input - blob data
 * @returns - blobUrl
 */
function blobToUrl(input: Blob): string {
	return URL.createObjectURL(input)
}

export default blobToUrl
