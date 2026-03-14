/**
 * url to blob
 *
 * @example
 * ```js
 * // Basic usage
 * const blob = await urlToBlob('https://example.com/image.jpg')
 * // Blob { size: 12345, type: 'image/jpeg' }
 *
 * // Use with file download
 * const blob = await urlToBlob('https://example.com/document.pdf')
 * const url = URL.createObjectURL(blob)
 * const link = document.createElement('a')
 * link.href = url
 * link.download = 'document.pdf'
 * link.click()
 *
 * // Error handling
 * try {
 *   const blob = await urlToBlob('https://example.com/file')
 * } catch (error) {
 *   console.error('Failed to fetch:', error)
 * }
 * ```
 * @since 5.13.0
 * @param input - url
 * @returns - blob promise
 */
function urlToBlob(input: string): Promise<Blob | null> {
	return new Promise((resolve, reject) => {
		if (!fetch) {
			const xhr = new XMLHttpRequest()
			xhr.open('get', input, true)
			xhr.responseType = 'blob'
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(xhr.response)
				}
			}
			xhr.onerror = reject
			xhr.send()
		} else {
			fetch(input)
				.then(res => {
					resolve(res.blob())
				})
				.catch(reject)
		}
	})
}

export default urlToBlob
