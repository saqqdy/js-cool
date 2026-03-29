/**
 * Binary module IE11 compatibility layer
 *
 * This module provides IE11-compatible alternatives to modern APIs
 * without requiring external polyfills.
 *
 * @module binary/_compat
 * @since 6.0.0
 * @internal
 */

// ==================== File Constructor ====================

/**
 * IE11-compatible File constructor
 * IE11 does not support new File(), fallback to Blob
 */
export function createFile(parts: globalThis.BlobPart[], name: string, options?: globalThis.BlobPropertyBag): File | Blob {
	// IE11 does not support File constructor
	if (typeof File === 'undefined') {
		const blob = new Blob(parts, options)
		// Add name property to simulate File
		;(blob as any).name = name
		return blob
	}
	return new File(parts, name, options)
}

// ==================== Text Encoding ====================

/**
 * IE11-compatible UTF-8 text encoder
 * TextEncoder is not available in IE11
 */
export function encodeText(str: string): Uint8Array {
	if (typeof TextEncoder !== 'undefined') {
		return new TextEncoder().encode(str)
	}

	// Manual UTF-8 encoding for IE11
	const bytes: number[] = []
	for (let i = 0; i < str.length; i++) {
		let code = str.charCodeAt(i)

		// Handle surrogate pairs
		if (code >= 0xD800 && code <= 0xDBFF && i + 1 < str.length) {
			const nextCode = str.charCodeAt(i + 1)
			if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
				code = 0x10000 + ((code - 0xD800) << 10) + (nextCode - 0xDC00)
				i++
			}
		}

		if (code < 0x80) {
			bytes.push(code)
		} else if (code < 0x800) {
			bytes.push(0xC0 | (code >> 6), 0x80 | (code & 0x3F))
		} else if (code < 0x10000) {
			bytes.push(0xE0 | (code >> 12), 0x80 | ((code >> 6) & 0x3F), 0x80 | (code & 0x3F))
		} else {
			bytes.push(
				0xF0 | (code >> 18),
				0x80 | ((code >> 12) & 0x3F),
				0x80 | ((code >> 6) & 0x3F),
				0x80 | (code & 0x3F)
			)
		}
	}
	return new Uint8Array(bytes)
}

/**
 * IE11-compatible UTF-8 text decoder
 * TextDecoder is not available in IE11
 */
export function decodeText(bytes: Uint8Array): string {
	if (typeof TextDecoder !== 'undefined') {
		return new TextDecoder().decode(bytes)
	}

	// Manual UTF-8 decoding for IE11
	let str = '',
	 i = 0

	while (i < bytes.length) {
		const byte = bytes[i]

		if (byte < 0x80) {
			str += String.fromCharCode(byte)
			i++
		} else if (byte < 0xE0) {
			str += String.fromCharCode(((byte & 0x1F) << 6) | (bytes[i + 1] & 0x3F))
			i += 2
		} else if (byte < 0xF0) {
			str += String.fromCharCode(
				((byte & 0x0F) << 12) | ((bytes[i + 1] & 0x3F) << 6) | (bytes[i + 2] & 0x3F)
			)
			i += 3
		} else {
			// Surrogate pair
			const codePoint =
				((byte & 0x07) << 18) |
				((bytes[i + 1] & 0x3F) << 12) |
				((bytes[i + 2] & 0x3F) << 6) |
				(bytes[i + 3] & 0x3F)
			const adjustedCodePoint = codePoint - 0x10000
			str += String.fromCharCode(
				0xD800 + (adjustedCodePoint >> 10),
				0xDC00 + (adjustedCodePoint & 0x3FF)
			)
			i += 4
		}
	}

	return str
}

// ==================== Base64 ====================

/**
 * Check if btoa is available
 */
export function hasBtoa(): boolean {
	return typeof btoa === 'function'
}

/**
 * Check if atob is available
 */
export function hasAtob(): boolean {
	return typeof atob === 'function'
}

/**
 * Base64 encode (browser)
 */
export function base64Encode(str: string): string {
	return btoa(str)
}

/**
 * Base64 decode (browser)
 */
export function base64Decode(base64: string): string {
	return atob(base64)
}

/**
 * ArrayBuffer to binary string (for base64 encoding)
 * Avoids spread operator which can cause stack overflow with large arrays
 */
export function arrayBufferToBinaryString(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer)
	let binary = ''
	const len = bytes.byteLength

	// Process in chunks to avoid call stack overflow
	const chunkSize = 8192
	for (let i = 0; i < len; i += chunkSize) {
		const chunk = bytes.subarray(i, Math.min(i + chunkSize, len))
		binary += String.fromCharCode.apply(null, Array.from(chunk))
	}

	return binary
}

/**
 * Binary string to ArrayBuffer (for base64 decoding)
 */
export function binaryStringToArrayBuffer(binary: string): ArrayBuffer {
	const len = binary.length
	const bytes = new Uint8Array(len)

	for (let i = 0; i < len; i++) {
		bytes[i] = binary.charCodeAt(i)
	}

	return bytes.buffer
}

// ==================== Capability Detection ====================

export interface CompatCapabilities {
	/** File constructor support */
	file: boolean
	/** TextEncoder/TextDecoder support */
	textEncoding: boolean
	/** btoa/atob support */
	base64: boolean
	/** crypto.subtle support */
	crypto: boolean
	/** ReadableStream support */
	stream: boolean
	/** CompressionStream support */
	compression: boolean
	/** URL.createObjectURL support */
	blobURL: boolean
}

/**
 * Detect browser capabilities for binary operations
 */
export function detectCapabilities(): CompatCapabilities {
	return {
		file: typeof File !== 'undefined',
		textEncoding: typeof TextEncoder !== 'undefined',
		base64: typeof btoa === 'function' && typeof atob === 'function',
		crypto: typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined',
		stream: typeof ReadableStream !== 'undefined',
		compression: typeof CompressionStream !== 'undefined',
		blobURL: typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function',
	}
}

/**
 * Get compatibility warnings
 */
export function getCompatWarnings(): string[] {
	const warnings: string[] = []
	const caps = detectCapabilities()

	if (!caps.file) {
		warnings.push('File constructor not supported, using Blob fallback')
	}
	if (!caps.textEncoding) {
		warnings.push('TextEncoder/TextDecoder not supported, using custom implementation')
	}
	if (!caps.crypto) {
		warnings.push('crypto.subtle not available, hash functions limited')
	}
	if (!caps.stream) {
		warnings.push('ReadableStream not supported, streaming not available')
	}
	if (!caps.compression) {
		warnings.push('CompressionStream not supported, compression not available')
	}

	return warnings
}
