/**
 * File download utilities
 *
 * @module download
 * @since 1.1.0
 */

/**
 * Save data as a file
 *
 * @example
 * ```ts
 * // Save text as file
 * saveFile('Hello World', 'hello.txt')
 *
 * // Save JSON as file
 * saveFile(JSON.stringify(data), 'data.json')
 *
 * // Save Blob
 * const blob = new Blob(['content'], { type: 'text/plain' })
 * saveFile(blob, 'file.txt')
 * ```
 * @param data - File data (string, Blob, ArrayBuffer, etc.)
 * @param filename - The name of the file
 * @param mimeType - MIME type (optional, default: 'application/octet-stream')
 */
export function saveFile(
	data: Blob | ArrayBuffer | string,
	filename: string,
	mimeType?: string
): void {
	const urlObject = window.URL || window.webkitURL || window
	const blob =
		data instanceof Blob
			? data
			: new Blob([data], { type: mimeType || 'application/octet-stream' })
	const link = document.createElement('a')
	link.href = urlObject.createObjectURL(blob)
	link.download = filename
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	urlObject.revokeObjectURL(link.href)
}

/**
 * Download file from URL via XMLHttpRequest
 *
 * @example
 * ```ts
 * downloadUrlFile('https://example.com/file.pdf', 'document.pdf')
 * ```
 * @param url - File URL
 * @param filename - The name of the file
 */
export function downloadUrlFile(url: string, filename: string): void {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.responseType = 'blob'
	xhr.onload = () => {
		if (xhr.status === 200) {
			saveFile(xhr.response, filename)
		}
	}
	xhr.send()
}

/**
 * Download file using anchor element
 *
 * @example
 * ```ts
 * downloadFile('https://example.com/file.pdf', 'document.pdf')
 * ```
 * @param url - File URL
 * @param filename - The name of the file
 */
export function downloadFile(url: string, filename: string): void {
	const link = document.createElement('a')
	link.style.display = 'none'
	link.download = filename
	link.href = url
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export type DownloadType = 'href' | 'open' | 'download' | 'request'

/**
 * Download file with various methods
 *
 * Several ways of file downloading:
 * 1. 'href' - Navigate to URL directly (window.location.href = URL)
 * 2. 'open' - Open in new tab (window.open(URL))
 * 3. 'download' - Use anchor download attribute (default)
 * 4. 'request' - Use XMLHttpRequest for authenticated downloads
 *
 * @example
 * ```ts
 * // Default download (anchor element)
 * download('https://example.com/file.pdf', 'document.pdf')
 *
 * // Open in new tab
 * download('https://example.com/file.pdf', 'document.pdf', 'open')
 *
 * // Navigate directly
 * download('https://example.com/file.pdf', 'document.pdf', 'href')
 *
 * // Use XHR (for authenticated downloads)
 * download('https://example.com/file.pdf', 'document.pdf', 'request')
 * ```
 * @param url - File URL
 * @param filename - Filename (optional, will extract from URL if not provided)
 * @param type - Download type: 'href', 'open', 'download', 'request' (default: 'download')
 */
export function download(url: string, filename?: string, type: DownloadType = 'download'): void {
	// Extract filename from URL if not provided
	const name = /[^/]+$/.exec(url)?.[0] || ''

	switch (type) {
		case 'open':
			window.open(url)
			break
		case 'href':
			window.location.href = url
			break
		case 'request':
			downloadUrlFile(url, filename || name)
			break
		case 'download':
		default:
			downloadFile(url, filename || name)
			break
	}
}

/**
 * Download namespace with all methods
 */
download.downloadUrlFile = downloadUrlFile
download.downloadFile = downloadFile
download.saveFile = saveFile

export default download
