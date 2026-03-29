/**
 * Text encoding module
 *
 * @module binary/modules/text
 * @since 6.0.0
 */

import type { TextAPI } from '../types'
import { decodeText, encodeText } from '../_compat'

/**
 * Encode string to ArrayBuffer
 *
 * @example
 * ```ts
 * const buffer = binary.text.encode('Hello 世界')
 * // ArrayBuffer { byteLength: 12 }
 * ```
 */
function encode(str: string, encoding = 'utf-8'): ArrayBuffer {
	if (encoding.toLowerCase() !== 'utf-8') {
		console.warn(`[js-cool] Only UTF-8 encoding is supported, got: ${encoding}`)
	}

	const bytes = encodeText(str)
	return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

/**
 * Decode ArrayBuffer to string
 *
 * @example
 * ```ts
 * const buffer = binary.text.encode('Hello')
 * const str = binary.text.decode(buffer)
 * // 'Hello'
 * ```
 */
function decode(buffer: ArrayBuffer, encoding = 'utf-8'): string {
	if (encoding.toLowerCase() !== 'utf-8') {
		console.warn(`[js-cool] Only UTF-8 encoding is supported, got: ${encoding}`)
	}

	const bytes = new Uint8Array(buffer)
	return decodeText(bytes)
}

/**
 * Convert string to base64
 *
 * @example
 * ```ts
 * const base64 = binary.text.toBase64('Hello 世界')
 * // 'SGVsbG8g5LiW55WM'
 * ```
 */
function toBase64(str: string): string {
	return btoa(unescape(encodeURIComponent(str)))
}

/**
 * Convert base64 to string
 *
 * @example
 * ```ts
 * const str = binary.text.fromBase64('SGVsbG8g5LiW55WM')
 * // 'Hello 世界'
 * ```
 */
function fromBase64(base64: string): string {
	return decodeURIComponent(escape(atob(base64)))
}

export const text: TextAPI = {
	encode,
	decode,
	toBase64,
	fromBase64,
}
