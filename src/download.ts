/**
 * File download utilities
 *
 * @module download
 * @since 1.1.0
 */

// ============================================
// Types
// ============================================

/** Error callback type */
export type DownloadErrorCallback = (error: Error) => void

/** Success callback type */
export type DownloadSuccessCallback = () => void

/**
 * Download type enumeration
 *
 * - `'href'` - Navigate to URL directly (window.location.href)
 * - `'open'` - Open in new tab (window.open)
 * - `'download'` - Use anchor download attribute (default)
 * - `'request'` - Use XMLHttpRequest for authenticated downloads
 */
export type DownloadType = 'href' | 'open' | 'download' | 'request'

/**
 * Download options for URL-based downloads
 */
export interface DownloadUrlOptions {
	/** Error callback */
	onError?: DownloadErrorCallback
	/** Success callback */
	onSuccess?: DownloadSuccessCallback
	/** Request timeout in milliseconds */
	timeout?: number
}

/**
 * Extended download options
 */
export interface DownloadOptions extends DownloadUrlOptions {
	/** Download type (default: 'download') */
	type?: DownloadType
}

// ============================================
// Core functions
// ============================================

/**
 * Save data as a file (triggers browser download)
 *
 * @example
 * ```ts
 * // Save text
 * saveFile('Hello World', 'hello.txt')
 *
 * // Save JSON
 * saveFile(JSON.stringify(data), 'data.json', 'application/json')
 *
 * // Save Blob
 * const blob = new Blob(['content'], { type: 'text/plain' })
 * saveFile(blob, 'file.txt')
 *
 * // Save ArrayBuffer
 * saveFile(new ArrayBuffer(10), 'data.bin')
 * ```
 *
 * @param data - File data (Blob, ArrayBuffer, or string)
 * @param filename - Download filename
 * @param mimeType - MIME type (default: 'application/octet-stream')
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
 * Download file from URL using XMLHttpRequest
 *
 * Useful for:
 * - Downloads requiring authentication headers
 * - Progress tracking
 * - Error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * downloadUrlFile('https://example.com/file.pdf', 'document.pdf')
 *
 * // With callbacks
 * downloadUrlFile('https://example.com/file.pdf', 'document.pdf', {
 *   onError: (err) => console.error('Failed:', err.message),
 *   onSuccess: () => console.log('Complete!')
 * })
 *
 * // With timeout
 * downloadUrlFile('https://example.com/large.zip', 'large.zip', {
 *   timeout: 60000 // 60 seconds
 * })
 * ```
 *
 * @param url - File URL to download
 * @param filename - Save as filename
 * @param options - Download options
 */
export function downloadUrlFile(
	url: string,
	filename: string,
	options?: DownloadUrlOptions
): void {
	const { onError, onSuccess, timeout } = options || {}

	const xhr = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.responseType = 'blob'

	if (timeout) {
		xhr.timeout = timeout
	}

	xhr.onload = () => {
		if (xhr.status === 200) {
			try {
				saveFile(xhr.response, filename)
				onSuccess?.()
			} catch (error) {
				onError?.(error instanceof Error ? error : new Error(String(error)))
			}
		} else {
			onError?.(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`))
		}
	}

	xhr.onerror = () => {
		onError?.(new Error('Network error: Failed to download file'))
	}

	xhr.ontimeout = () => {
		onError?.(new Error(`Request timeout after ${timeout}ms`))
	}

	xhr.onabort = () => {
		onError?.(new Error('Download aborted'))
	}

	try {
		xhr.send()
	} catch (error) {
		onError?.(error instanceof Error ? error : new Error(String(error)))
	}
}

/**
 * Download file using anchor element (simple download)
 *
 * @example
 * ```ts
 * downloadFile('https://example.com/file.pdf', 'document.pdf')
 * ```
 *
 * @param url - File URL
 * @param filename - Download filename
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

// ============================================
// Main download function
// ============================================

/** Extract filename from URL */
function extractFilename(url: string): string {
	return /[^/]+$/.exec(url)?.[0] || ''
}

/**
 * Download file with various methods
 *
 * @example
 * ```ts
 * // Default (anchor download)
 * download('https://example.com/file.pdf', 'document.pdf')
 *
 * // Open in new tab
 * download('https://example.com/file.pdf', 'document.pdf', { type: 'open' })
 *
 * // Navigate directly
 * download('https://example.com/file.pdf', { type: 'href' })
 *
 * // With XHR and error handling
 * download('https://example.com/file.pdf', 'document.pdf', {
 *   type: 'request',
 *   onError: (err) => console.error(err),
 *   onSuccess: () => console.log('Done!'),
 *   timeout: 30000
 * })
 *
 * // Legacy signature (deprecated)
 * download('https://example.com/file.pdf', 'document.pdf', 'open')
 * ```
 *
 * @param url - File URL
 * @param filename - Optional filename (extracted from URL if not provided)
 * @param options - Download options or type string (deprecated)
 */
function downloadImpl(
	url: string,
	filename?: string | DownloadOptions | DownloadType,
	options?: DownloadOptions | DownloadType
): void {
	// Normalize arguments
	let type: DownloadType = 'download'
	let downloadOptions: DownloadOptions = {}
	let finalFilename: string | undefined

	// Handle overloaded signatures
	if (typeof filename === 'string') {
		finalFilename = filename
		if (typeof options === 'string') {
			type = options
		} else if (options) {
			type = options.type || 'download'
			downloadOptions = options
		}
	} else if (filename && typeof filename === 'object') {
		// download(url, options)
		downloadOptions = filename
		type = filename.type || 'download'
	}

	// Extract filename from URL if not provided
	finalFilename = finalFilename || extractFilename(url)

	switch (type) {
		case 'open':
			window.open(url)
			break
		case 'href':
			window.location.href = url
			break
		case 'request':
			downloadUrlFile(url, finalFilename, downloadOptions)
			break
		case 'download':
		default:
			downloadFile(url, finalFilename)
			break
	}
}

/**
 * Download namespace with all methods
 *
 * @example
 * ```ts
 * import { download } from 'js-cool'
 *
 * download('url', 'file.pdf')
 * download.saveFile(data, 'file.txt')
 * download.downloadUrlFile('url', 'file.pdf', { timeout: 30000 })
 * download.open('url', 'file.pdf')  // open in new tab
 * ```
 */
const download = Object.assign(downloadImpl, {
	/** Download file from URL with XHR */
	downloadUrlFile,
	/** Simple anchor download */
	downloadFile,
	/** Save data as file */
	saveFile,
	/** Open URL in new tab */
	open: (url: string, filename?: string, options?: Omit<DownloadOptions, 'type'>) =>
		downloadImpl(url, filename, { ...options, type: 'open' }),
	/** Navigate to URL */
	href: (url: string) => {
		window.location.href = url
	},
})

export default download
