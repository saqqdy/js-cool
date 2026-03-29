/**
 * SVG conversion module
 *
 * @module binary/modules/svg
 * @since 6.0.0
 */

import type { SVGAPI, URLResult } from '../types'

/**
 * Convert SVG string to Blob
 *
 * @example
 * ```ts
 * const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>'
 * const blob = binary.svg.toBlob(svg)
 * // Blob { type: 'image/svg+xml' }
 * ```
 */
function toBlob(svg: string): Blob {
	return new Blob([svg], { type: 'image/svg+xml' })
}

/**
 * Convert SVG string to data URL
 *
 * @example
 * ```ts
 * const svg = '<svg>...</svg>'
 * const dataURL = binary.svg.toDataURL(svg)
 * // 'data:image/svg+xml;base64,...'
 * ```
 */
function toDataURL(svg: string): string {
	const base64 = btoa(unescape(encodeURIComponent(svg)))
	return `data:image/svg+xml;base64,${base64}`
}

/**
 * Convert SVG string to URL with revoke function
 *
 * @example
 * ```ts
 * const svg = '<svg>...</svg>'
 * const { url, revoke } = binary.svg.toURL(svg)
 * document.getElementById('img').src = url
 * // Later...
 * revoke() // Clean up
 * ```
 */
function toURL(svg: string): URLResult {
	const blob = toBlob(svg)
	const url = URL.createObjectURL(blob)

	return {
		url,
		revoke: () => URL.revokeObjectURL(url),
	}
}

export const svg: SVGAPI = {
	toBlob,
	toDataURL,
	toURL,
}
