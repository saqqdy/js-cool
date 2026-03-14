/**
 * blob to blobUrl
 *
 * @example
 * ```js
 * // Basic usage
 * const blob = new Blob(['Hello World'], { type: 'text/plain' })
 * const url = blobToUrl(blob)
 * // 'blob:https://example.com/uuid-here'
 *
 * // Use with image preview
 * const imageBlob = await fetch('image.png').then(r => r.blob())
 * const imageUrl = blobToUrl(imageBlob)
 * document.getElementById('preview').src = imageUrl
 *
 * // Use with video
 * const videoBlob = await fetch('video.mp4').then(r => r.blob())
 * const videoUrl = blobToUrl(videoBlob)
 *
 * // Remember to revoke URL when done
 * URL.revokeObjectURL(url)
 * ```
 * @since 5.13.0
 * @param input - blob data
 * @returns - blobUrl string
 */
function blobToUrl(input: Blob): string {
	return URL.createObjectURL(input)
}

export default blobToUrl
