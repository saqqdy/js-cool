/**
 * ArrayBuffer conversion module
 *
 * @module binary/modules/arrayBuffer
 * @since 6.0.0
 */

import type { ArrayBufferAPI } from '../types'
import { arrayBufferToBinaryString, decodeText } from '../_compat'

/**
 * Convert ArrayBuffer to base64 string
 *
 * @example
 * ```ts
 * const buffer = new TextEncoder().encode('Hello').buffer
 * const base64 = binary.arrayBuffer.toBase64(buffer)
 * // 'SGVsbG8='
 *
 * // With mime for data URL
 * const dataURL = binary.arrayBuffer.toBase64(buffer, 'text/plain')
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function toBase64(buffer: ArrayBuffer, mime?: string): string {
	const binary = arrayBufferToBinaryString(buffer)
	const base64 = btoa(binary)

	if (mime) {
		return `data:${mime};base64,${base64}`
	}

	return base64
}

/**
 * Convert ArrayBuffer to data URL
 *
 * @example
 * ```ts
 * const buffer = new TextEncoder().encode('Hello').buffer
 * const dataURL = binary.arrayBuffer.toDataURL(buffer, 'text/plain')
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function toDataURL(buffer: ArrayBuffer, mime: string): string {
	return toBase64(buffer, mime)
}

/**
 * Convert ArrayBuffer to Blob
 *
 * @example
 * ```ts
 * const buffer = new TextEncoder().encode('Hello').buffer
 * const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')
 * // Blob { size: 5, type: 'text/plain' }
 * ```
 */
function toBlob(buffer: ArrayBuffer, mime = 'application/octet-stream'): Blob {
	return new Blob([buffer], { type: mime })
}

/**
 * Convert ArrayBuffer to string
 *
 * @example
 * ```ts
 * const buffer = new TextEncoder().encode('Hello').buffer
 * const str = binary.arrayBuffer.toString(buffer)
 * // 'Hello'
 * ```
 */
function toString(buffer: ArrayBuffer, encoding = 'utf-8'): string {
	if (encoding.toLowerCase() !== 'utf-8') {
		console.warn(`[js-cool] Only UTF-8 encoding is supported, got: ${encoding}`)
	}

	const bytes = new Uint8Array(buffer)
	return decodeText(bytes)
}

/**
 * Convert ArrayBuffer to hex string
 *
 * @example
 * ```ts
 * const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
 * const hex = binary.arrayBuffer.toHex(buffer)
 * // '48656c6c6f'
 * ```
 */
function toHex(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer)
	let hex = ''

	for (let i = 0; i < bytes.length; i++) {
		const byte = bytes[i]
		hex += (byte < 16 ? '0' : '') + byte.toString(16)
	}

	return hex
}

export const arrayBuffer: ArrayBufferAPI = {
	toBase64,
	toDataURL,
	toBlob,
	toString,
	toHex,
}
