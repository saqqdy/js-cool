/**
 * URL conversion module
 *
 * @module binary/modules/url
 * @since 6.0.0
 */

import type { URLAPI } from '../types'

/**
 * Fetch URL and convert to Blob
 *
 * @example
 * ```ts
 * const blob = await binary.url.toBlob('https://example.com/image.png')
 * // Blob { type: 'image/png' }
 * ```
 */
async function toBlob(url: string): Promise<Blob> {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`)
	}

	return response.blob()
}

/**
 * Fetch URL and convert to data URL
 *
 * @example
 * ```ts
 * const dataURL = await binary.url.toDataURL('https://example.com/image.png')
 * // 'data:image/png;base64,iVBORw0KGgo...'
 * ```
 */
async function toDataURL(url: string): Promise<string> {
	const blob = await toBlob(url)

	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert to data URL'))
			}
		}
		reader.onerror = () => reject(reader.error || new Error('FileReader error'))
		reader.readAsDataURL(blob)
	})
}

export const url: URLAPI = {
	toBlob,
	toDataURL,
}
