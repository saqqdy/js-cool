/**
 * Binary type detection module
 *
 * @module binary/detect
 * @since 6.0.0
 */

import type { BinaryData, BinaryInput, BinaryType } from './types'

/**
 * Check if value is a Blob
 *
 * @example
 * ```ts
 * binary.isBlob(new Blob(['hello'])) // true
 * binary.isBlob('string') // false
 * ```
 */
export function isBlob(value: unknown): value is Blob {
	return value instanceof Blob
}

/**
 * Check if value is a File
 *
 * @example
 * ```ts
 * binary.isFile(new File(['hello'], 'test.txt')) // true
 * binary.isFile(new Blob(['hello'])) // false
 * ```
 */
export function isFile(value: unknown): value is File {
	return value instanceof File
}

/**
 * Check if value is an ArrayBuffer
 *
 * @example
 * ```ts
 * binary.isArrayBuffer(new ArrayBuffer(8)) // true
 * binary.isArrayBuffer(new Uint8Array(8)) // false
 * ```
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
	return value instanceof ArrayBuffer
}

/**
 * Check if string is a valid data URL
 *
 * @example
 * ```ts
 * binary.isDataURL('data:text/plain;base64,SGVsbG8=') // true
 * binary.isDataURL('https://example.com') // false
 * ```
 */
export function isDataURL(value: unknown): boolean {
	if (typeof value !== 'string') return false
	if (!value.startsWith('data:')) return false

	const commaIndex = value.indexOf(',')
	if (commaIndex === -1) return false

	const prefix = value.slice(0, commaIndex)
	return /^data:[^;,]+(?:;base64)?$/.test(prefix)
}

/**
 * Check if string is a valid base64 string
 *
 * @example
 * ```ts
 * binary.isBase64('SGVsbG8gV29ybGQ=') // true
 * binary.isBase64('not base64!') // false
 * ```
 */
export function isBase64(value: unknown): boolean {
	if (typeof value !== 'string') return false

	// Skip data URLs
	if (value.startsWith('data:')) return false

	// Valid base64 characters
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value)) return false

	// Check if length is valid (multiple of 4 or can be padded)
	const len = value.length
	if (len === 0) return true

	// Try to decode
	try {
		return btoa(atob(value)) === value
	} catch {
		return false
	}
}

/**
 * Detect the type of binary input
 *
 * @example
 * ```ts
 * detectType(new Blob()) // 'blob'
 * detectType(new File()) // 'file'
 * detectType(new ArrayBuffer(8)) // 'arrayBuffer'
 * detectType('data:text/plain;base64,SGVsbG8=') // 'dataURL'
 * detectType('SGVsbG8=') // 'base64'
 * detectType('https://example.com/file') // 'url'
 * detectType('<svg>...</svg>') // 'svg'
 * ```
 */
export function detectType(input: BinaryInput): BinaryType {
	if (input instanceof File) return 'file'
	if (input instanceof Blob) return 'blob'
	if (input instanceof ArrayBuffer) return 'arrayBuffer'
	if (input instanceof Uint8Array) return 'arrayBuffer'

	if (typeof input === 'string') {
		if (input.startsWith('data:')) return 'dataURL'
		if (input.startsWith('<svg')) return 'svg'
		if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('//')) {
			return 'url'
		}
		return 'base64'
	}

	return 'blob'
}

/**
 * Parse binary input into a structured object
 *
 * @example
 * ```ts
 * const parsed = parse(new Blob(['hello'], { type: 'text/plain' }))
 * // { data: Blob, type: 'blob', mime: 'text/plain', size: 5 }
 * ```
 */
export function parse(input: BinaryInput): BinaryData {
	const type = detectType(input)

	let data: Blob | File | ArrayBuffer | string,
	 mime: string | undefined,
	 name: string | undefined,
	 size: number

	if (input instanceof Uint8Array) {
		data = input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength) as ArrayBuffer
		size = input.byteLength
	} else {
		data = input
	}

	switch (type) {
		case 'file':
			size = (input as File).size
			mime = (input as File).type || undefined
			name = (input as File).name
			break
		case 'blob':
			size = (input as Blob).size
			mime = (input as Blob).type || undefined
			break
		case 'arrayBuffer':
			size = (input as ArrayBuffer).byteLength
			break
		case 'dataURL': {
			const str = input as string
			const commaIndex = str.indexOf(',')
			if (commaIndex > 0) {
				const prefix = str.slice(0, commaIndex)
				const mimeMatch = prefix.match(/^data:([^;,]+)/)
				mime = mimeMatch?.[1]
			}
			size = str.length
			break
		}
		case 'base64':
			size = Math.floor(((input as string).length * 3) / 4)
			break
		case 'svg':
			size = (input as string).length
			mime = 'image/svg+xml'
			break
		case 'url':
			size = (input as string).length
			break
		default:
			size = 0
	}

	return {
		name,
		type,
		data,
		mime,
		size,
	}
}
