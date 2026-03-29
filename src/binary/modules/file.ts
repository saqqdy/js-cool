/**
 * File conversion module
 *
 * @module binary/modules/file
 * @since 6.0.0
 */

import type { FileAPI } from '../types'

/**
 * Convert File to ArrayBuffer
 *
 * @example
 * ```ts
 * const file = document.querySelector('input[type="file"]').files[0]
 * const buffer = await binary.file.toArrayBuffer(file)
 * ```
 */
function toArrayBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (reader.result instanceof ArrayBuffer) {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert File to ArrayBuffer'))
			}
		}
		reader.onerror = () => reject(reader.error || new Error('FileReader error'))
		reader.readAsArrayBuffer(file)
	})
}

/**
 * Convert File to base64
 *
 * @example
 * ```ts
 * const file = document.querySelector('input[type="file"]').files[0]
 * const base64 = await binary.file.toBase64(file)
 * // 'data:image/png;base64,iVBORw0KGgo...'
 * ```
 */
function toBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert File to base64'))
			}
		}
		reader.onerror = () => reject(reader.error || new Error('FileReader error'))
		reader.readAsDataURL(file)
	})
}

/**
 * Convert File to Blob
 *
 * @example
 * ```ts
 * const file = document.querySelector('input[type="file"]').files[0]
 * const blob = binary.file.toBlob(file)
 * // Blob { type: file.type }
 * ```
 */
function toBlob(file: File): Blob {
	return new Blob([file], { type: file.type || undefined })
}

export const file: FileAPI = {
	toBase64,
	toArrayBuffer,
	toBlob,
}
