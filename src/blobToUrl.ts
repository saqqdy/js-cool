/**
 * blob to blobUrl
 *
 * @since 5.13.0
 * @param input - blob data
 * @returns - blobUrl
 */
function blobToUrl(input: Blob): string {
	return URL.createObjectURL(input)
}

export default blobToUrl
