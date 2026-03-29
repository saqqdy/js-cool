/**
 * Base64 conversion module
 *
 * @module binary/modules/base64
 * @since 6.0.0
 */

import type { Base64API } from '../types'
import { binaryStringToArrayBuffer, createFile } from '../_compat'

/**
 * Encode string to base64
 *
 * @example
 * ```ts
 * binary.base64.encode('Hello World') // 'SGVsbG8gV29ybGQ='
 * ```
 */
function encode(str: string): string {
	return btoa(unescape(encodeURIComponent(str)))
}

/**
 * Decode base64 to string
 *
 * @example
 * ```ts
 * binary.base64.decode('SGVsbG8gV29ybGQ=') // 'Hello World'
 * ```
 */
function decode(base64: string): string {
	return decodeURIComponent(escape(atob(base64)))
}

/**
 * Parse base64 string, handling data URL prefix
 *
 * @param input - Base64 string or data URL
 * @returns Object with pure base64 and optional mime
 */
function parseBase64(input: string): { base64: string; mime?: string } {
	// Check if it's a data URL
	if (input.startsWith('data:')) {
		const commaIndex = input.indexOf(',')
		if (commaIndex === -1) {
			throw new Error('Invalid data URL: missing comma separator')
		}

		const prefix = input.slice(0, commaIndex)
		const base64 = input.slice(commaIndex + 1)

		// Extract mime from "data:mime;base64"
		const mimeMatch = prefix.match(/^data:([^;]+);/)

		return {
			base64,
			mime: mimeMatch?.[1],
		}
	}

	// Pure base64 string
	return { base64: input }
}

/**
 * Convert base64 to ArrayBuffer
 *
 * @example
 * ```ts
 * const buffer = binary.base64.toArrayBuffer('SGVsbG8gV29ybGQ=')
 * // ArrayBuffer { byteLength: 11 }
 * ```
 */
function toArrayBuffer(base64: string): ArrayBuffer {
	const { base64: pureBase64 } = parseBase64(base64)
	const binary = atob(pureBase64)
	return binaryStringToArrayBuffer(binary)
}

/**
 * Convert base64 to Blob
 *
 * @example
 * ```ts
 * // Pure base64 with mime
 * const blob = binary.base64.toBlob('SGVsbG8=', 'text/plain')
 *
 * // Data URL (mime auto-detected)
 * const blob = binary.base64.toBlob('data:image/png;base64,iVBORw0KGgo...')
 * ```
 */
function toBlob(base64: string, mime?: string): Blob {
	const { base64: pureBase64, mime: detectedMime } = parseBase64(base64)
	const finalMime = mime || detectedMime || 'application/octet-stream'
	const buffer = toArrayBuffer(pureBase64)

	return new Blob([buffer], { type: finalMime })
}

/**
 * Convert base64 to data URL
 *
 * @example
 * ```ts
 * const dataURL = binary.base64.toDataURL('SGVsbG8=', 'text/plain')
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function toDataURL(base64: string, mime: string): string {
	const { base64: pureBase64 } = parseBase64(base64)
	return `data:${mime};base64,${pureBase64}`
}

/**
 * Convert base64 to File
 *
 * @example
 * ```ts
 * const file = binary.base64.toFile('SGVsbG8=', 'hello.txt', 'text/plain')
 * // File { name: 'hello.txt', type: 'text/plain' }
 * ```
 */
function toFile(base64: string, filename: string, mime?: string): File | Blob {
	const { base64: pureBase64, mime: detectedMime } = parseBase64(base64)
	const finalMime = mime || detectedMime || 'application/octet-stream'
	const buffer = toArrayBuffer(pureBase64)

	return createFile([buffer], filename, { type: finalMime })
}

export const base64: Base64API = {
	encode,
	decode,
	toBlob,
	toArrayBuffer,
	toDataURL,
	toFile,
}
