/**
 * Blob conversion module
 *
 * @module binary/modules/blob
 * @since 6.0.0
 */

import type { BlobAPI, URLResult } from '../types'
import { createFile } from '../_compat'

/**
 * Convert Blob to ArrayBuffer
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'])
 * const buffer = await binary.blob.toArrayBuffer(blob)
 * // ArrayBuffer { byteLength: 5 }
 * ```
 */
function toArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (reader.result instanceof ArrayBuffer) {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert Blob to ArrayBuffer'))
			}
		}
		reader.onerror = () => reject(reader.error || new Error('FileReader error'))
		reader.readAsArrayBuffer(blob)
	})
}

/**
 * Convert Blob to base64
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'], { type: 'text/plain' })
 * const base64 = await binary.blob.toBase64(blob)
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function toBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert Blob to base64'))
			}
		}
		reader.onerror = () => reject(reader.error || new Error('FileReader error'))
		reader.readAsDataURL(blob)
	})
}

/**
 * Convert Blob to data URL
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'], { type: 'text/plain' })
 * const dataURL = await binary.blob.toDataURL(blob)
 * // 'data:text/plain;base64,SGVsbG8='
 * ```
 */
function toDataURL(blob: Blob): Promise<string> {
	return toBase64(blob)
}

/**
 * Convert Blob to File
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'], { type: 'text/plain' })
 * const file = binary.blob.toFile(blob, 'hello.txt')
 * // File { name: 'hello.txt', type: 'text/plain' }
 * ```
 */
function toFile(blob: Blob, filename: string): File | Blob {
	return createFile([blob], filename, { type: blob.type || undefined })
}

/**
 * Convert Blob to URL with revoke function
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'])
 * const { url, revoke } = binary.blob.toURL(blob)
 * console.log(url) // 'blob:https://...'
 * revoke() // Clean up
 * ```
 */
function toURL(blob: Blob): URLResult {
	const url = URL.createObjectURL(blob)

	return {
		url,
		revoke: () => URL.revokeObjectURL(url),
	}
}

/**
 * Concatenate multiple Blobs
 *
 * @example
 * ```ts
 * const blob1 = new Blob(['Hello '])
 * const blob2 = new Blob(['World'])
 * const merged = binary.blob.concat([blob1, blob2], 'text/plain')
 * // Blob { size: 11, type: 'text/plain' }
 * ```
 */
function concat(blobs: Blob[], mime?: string): Blob {
	return new Blob(blobs, { type: mime || blobs[0]?.type || undefined })
}

/**
 * Slice a Blob
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello World'])
 * const slice = binary.blob.slice(blob, 0, 5)
 * // Blob { size: 5 }
 * ```
 */
function slice(blob: Blob, start: number, end: number, mime?: string): Blob {
	return blob.slice(start, end, mime || blob.type || undefined)
}

export const blob: BlobAPI = {
	toBase64,
	toArrayBuffer,
	toDataURL,
	toFile,
	toURL,
	concat,
	slice,
}
