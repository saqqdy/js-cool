/**
 * Binary conversion module - Unified binary data conversion API
 *
 * @module binary
 * @since 6.0.0
 *
 * @example
 * ```ts
 * import { binary } from 'js-cool'
 *
 * // Chainable conversion
 * const blob = new Blob(['Hello'])
 * const base64 = await binary.from(blob).toBase64()
 * const url = await binary.from(blob).toURL()
 * url.revoke() // Clean up
 *
 * // Convenience methods
 * const b64 = binary.base64.encode('Hello World')
 * const buffer = binary.base64.toArrayBuffer(b64)
 * const newBlob = binary.arrayBuffer.toBlob(buffer)
 *
 * // Type detection
 * binary.isBlob(data) // true/false
 * binary.isDataURL(str) // true/false
 *
 * // Enhanced features
 * const hash = await binary.hash.sha256(blob)
 * const meta = binary.meta.get(file)
 * const hex = binary.hex.encode(buffer)
 * ```
 */

import type { BinaryAPI, BinaryInput } from './types'
// Converter
import { from } from './converter'
// Detection
import {
	isArrayBuffer,
	isBase64,
	isBlob,
	isDataURL,
	isFile,
	parse,
} from './detect'
import { arrayBuffer } from './modules/arrayBuffer'
// Types
// Core modules
import { base64 } from './modules/base64'
import { blob } from './modules/blob'

import { dataURL } from './modules/dataURL'
import { file } from './modules/file'
import { hash } from './modules/hash'
import { hex } from './modules/hex'
import { meta } from './modules/meta'

import { svg } from './modules/svg'

// Enhanced modules
import { text } from './modules/text'

import { url } from './modules/url'

export type {
	ArrayBufferAPI,
	Base64API,
	BinaryAPI,
	BinaryConverter,
	BinaryData,
	BinaryFromOptions,
	BinaryInput,
	BinaryMeta,
	BinaryType,
	BlobAPI,
	DataURLAPI,
	FileAPI,
	HashAPI,
	HexAPI,
	MetaAPI,
	SVGAPI,
	TextAPI,
	URLAPI,
	URLResult,
} from './types'

/**
 * Compare two binary inputs for content equality
 *
 * @example
 * ```ts
 * const blob1 = new Blob(['Hello'])
 * const blob2 = new Blob(['Hello'])
 * const same = await binary.compare(blob1, blob2) // true
 * ```
 */
async function compare(a: BinaryInput, b: BinaryInput): Promise<boolean> {
	// Quick size check
	const sizeA = a instanceof Blob ? a.size : a instanceof ArrayBuffer ? a.byteLength : a instanceof Uint8Array ? a.length : (a as string).length
	const sizeB = b instanceof Blob ? b.size : b instanceof ArrayBuffer ? b.byteLength : b instanceof Uint8Array ? b.length : (b as string).length

	if (sizeA !== sizeB) return false

	// Convert to ArrayBuffer for comparison
	const bufferA = await from(a).toArrayBuffer()
	const bufferB = await from(b).toArrayBuffer()

	// Compare byte by byte
	const bytesA = new Uint8Array(bufferA)
	const bytesB = new Uint8Array(bufferB)

	for (let i = 0; i < bytesA.length; i++) {
		if (bytesA[i] !== bytesB[i]) return false
	}

	return true
}

/**
 * Clone binary data
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello'])
 * const cloned = binary.clone(blob)
 * // New Blob with same content
 * ```
 */
function clone(data: Blob | File | ArrayBuffer): Blob | ArrayBuffer {
	if (data instanceof ArrayBuffer) {
		return data.slice(0)
	}
	if (data instanceof Blob) {
		return new Blob([data], { type: data.type || undefined })
	}
	throw new Error('Unsupported type for cloning')
}

/**
 * Download binary data as file
 *
 * @example
 * ```ts
 * const blob = new Blob(['Hello World'], { type: 'text/plain' })
 * binary.download(blob, 'hello.txt')
 * ```
 */
function download(data: Blob | File | ArrayBuffer, filename: string, mime?: string): void {
	let blob: Blob

	if (data instanceof ArrayBuffer) {
		blob = new Blob([data], { type: mime || 'application/octet-stream' })
	} else {
		blob = data
	}

	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

/**
 * Binary namespace
 *
 * Provides unified API for binary data conversion
 */
export const binary: BinaryAPI = {
	// Type detection
	isBlob,
	isFile,
	isArrayBuffer,
	isDataURL,
	isBase64,

	// Chainable conversion
	from,

	// Parse
	parse,

	// Core conversion modules
	base64,
	blob,
	arrayBuffer,
	file,
	url,
	svg,

	// Enhanced modules
	text,
	dataURL,
	hex,
	hash,
	meta,

	// Utility methods
	compare,
	clone,
	download,
}

export default binary
