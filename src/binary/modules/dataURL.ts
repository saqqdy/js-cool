/**
 * DataURL module
 *
 * @module binary/modules/dataURL
 * @since 6.0.0
 */

import type { DataURLAPI } from '../types'
import { base64 } from './base64'

/**
 * Parse data URL into components
 *
 * @example
 * ```ts
 * const parsed = binary.dataURL.parse('data:image/png;base64,iVBORw0KGgo...')
 * // { mime: 'image/png', base64: 'iVBORw0KGgo...', data: ArrayBuffer }
 * ```
 */
function parse(dataURL: string): { mime: string; base64: string; data: ArrayBuffer } {
	if (!isValid(dataURL)) {
		throw new Error('Invalid data URL format')
	}

	const commaIndex = dataURL.indexOf(',')
	if (commaIndex === -1) {
		throw new Error('Invalid data URL: missing comma separator')
	}

	const prefix = dataURL.slice(0, commaIndex)
	const base64Data = dataURL.slice(commaIndex + 1)

	// Parse prefix: "data:mime;base64"
	const mimeMatch = prefix.match(/^data:([^;,]+)/)
	const mime = mimeMatch?.[1] || 'text/plain'

	return {
		mime,
		base64: base64Data,
		data: base64.toArrayBuffer(base64Data),
	}
}

/**
 * Build data URL from base64 and mime
 *
 * @example
 * ```ts
 * const dataURL = binary.dataURL.build('SGVsbG8=', 'text/plain')
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function build(base64: string, mime: string): string {
	return `data:${mime};base64,${base64}`
}

/**
 * Check if string is a valid data URL
 *
 * @example
 * ```ts
 * binary.dataURL.isValid('data:text/plain;base64,SGVsbG8=') // true
 * binary.dataURL.isValid('not a data url') // false
 * ```
 */
function isValid(str: string): boolean {
	if (typeof str !== 'string') return false
	if (!str.startsWith('data:')) return false

	const commaIndex = str.indexOf(',')
	if (commaIndex === -1) return false

	const prefix = str.slice(0, commaIndex)
	// Check prefix format: data:mime;base64 or data:mime
	if (!/^data:[^;,]+(?:;base64)?$/.test(prefix)) return false

	return true
}

export const dataURL: DataURLAPI = {
	parse,
	build,
	isValid,
}
