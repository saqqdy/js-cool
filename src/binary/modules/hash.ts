/**
 * Hash module
 *
 * @module binary/modules/hash
 * @since 6.0.0
 */

import type { BinaryInput, HashAPI } from '../types'
import { blob } from './blob'

/**
 * Convert BinaryInput to ArrayBuffer (UTF-8 encoded for strings)
 */
async function toArrayBuffer(data: BinaryInput): Promise<ArrayBuffer> {
	if (data instanceof ArrayBuffer) return data
	if (data instanceof Uint8Array) return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
	if (data instanceof Blob) return blob.toArrayBuffer(data)
	if (typeof data === 'string') {
		// Encode string to UTF-8 bytes for consistent hashing
		const encoder = new TextEncoder()
		const bytes = encoder.encode(data)
		return bytes.buffer as ArrayBuffer
	}
	throw new Error('Unsupported input type')
}

/**
 * Calculate SHA-256 hash using crypto.subtle
 *
 * @example
 * ```ts
 * const hash = await binary.hash.sha256('Hello World')
 * // 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
 * ```
 */
async function sha256(data: BinaryInput): Promise<string> {
	if (typeof crypto === 'undefined' || !crypto.subtle) {
		throw new Error('crypto.subtle is not available')
	}

	const buffer = await toArrayBuffer(data)
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
	const hashArray = new Uint8Array(hashBuffer)

	return Array.from(hashArray)
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

/**
 * Calculate SHA-1 hash using crypto.subtle
 *
 * @example
 * ```ts
 * const hash = await binary.hash.sha1('Hello World')
 * // '0a4d55a8d778e5022fab701977c5d840bbc486d0'
 * ```
 */
async function sha1(data: BinaryInput): Promise<string> {
	if (typeof crypto === 'undefined' || !crypto.subtle) {
		throw new Error('crypto.subtle is not available')
	}

	const buffer = await toArrayBuffer(data)
	const hashBuffer = await crypto.subtle.digest('SHA-1', buffer)
	const hashArray = new Uint8Array(hashBuffer)

	return Array.from(hashArray)
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

/**
 * CRC32 lookup table
 */
const CRC32_TABLE = (() => {
	const table = new Uint32Array(256)
	for (let i = 0; i < 256; i++) {
		let c = i
		for (let j = 0; j < 8; j++) {
			c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
		}
		table[i] = c
	}
	return table
})()

/**
 * Calculate CRC32 checksum
 *
 * @example
 * ```ts
 * const crc = binary.hash.crc32('Hello World')
 * // 2346237359
 * ```
 */
function crc32(data: BinaryInput): number {
	let buffer: ArrayBuffer

	if (data instanceof ArrayBuffer) {
		buffer = data
	} else if (data instanceof Uint8Array) {
		buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
	} else if (data instanceof Blob) {
		throw new TypeError('crc32 does not support Blob input, use async version or convert to ArrayBuffer first')
	} else if (typeof data === 'string') {
		// Simple string encoding
		const bytes = new Uint8Array(data.length)
		for (let i = 0; i < data.length; i++) {
			bytes[i] = data.charCodeAt(i)
		}
		buffer = bytes.buffer as ArrayBuffer
	} else {
		throw new TypeError('Unsupported input type')
	}

	const bytes = new Uint8Array(buffer)
	let crc = 0xFFFFFFFF,
		i = 0

	for (; i < bytes.length; i++) {
		crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8)
	}

	return (crc ^ 0xFFFFFFFF) >>> 0
}

/**
 * MD5 hash (simplified implementation for compatibility)
 * Note: For security-sensitive applications, use SHA-256 instead
 *
 * @example
 * ```ts
 * const hash = await binary.hash.md5('Hello World')
 * // 'b10a8db164e0754105b7a99be72e3fe5'
 * ```
 */
async function md5(data: BinaryInput): Promise<string> {
	// MD5 implementation using crypto.subtle is not available
	// Use a pure JS implementation or throw error
	// For now, we'll implement a basic version

	const buffer = await toArrayBuffer(data)
	const bytes = new Uint8Array(buffer)

	// Simple MD5 implementation
	return md5Hash(bytes)
}

/**
 * Simple MD5 hash implementation
 */
function md5Hash(message: Uint8Array): string {
	// MD5 constants
	const K = new Uint32Array([
		0xD76AA478, 0xE8C7B756, 0x242070DB, 0xC1BDCEEE,
		0xF57C0FAF, 0x4787C62A, 0xA8304613, 0xFD469501,
		0x698098D8, 0x8B44F7AF, 0xFFFF5BB1, 0x895CD7BE,
		0x6B901122, 0xFD987193, 0xA679438E, 0x49B40821,
		0xF61E2562, 0xC040B340, 0x265E5A51, 0xE9B6C7AA,
		0xD62F105D, 0x02441453, 0xD8A1E681, 0xE7D3FBC8,
		0x21E1CDE6, 0xC33707D6, 0xF4D50D87, 0x455A14ED,
		0xA9E3E905, 0xFCEFA3F8, 0x676F02D9, 0x8D2A4C8A,
		0xFFFA3942, 0x8771F681, 0x6D9D6122, 0xFDE5380C,
		0xA4BEEA44, 0x4BDECFA9, 0xF6BB4B60, 0xBEBFBC70,
		0x289B7EC6, 0xEAA127FA, 0xD4EF3085, 0x04881D05,
		0xD9D4D039, 0xE6DB99E5, 0x1FA27CF8, 0xC4AC5665,
		0xF4292244, 0x432AFF97, 0xAB9423A7, 0xFC93A039,
		0x655B59C3, 0x8F0CCC92, 0xFFEFF47D, 0x85845DD1,
		0x6FA87E4F, 0xFE2CE6E0, 0xA3014314, 0x4E0811A1,
		0xF7537E82, 0xBD3AF235, 0x2AD7D2BB, 0xEB86D391,
	])

	const S = new Uint8Array([
		7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
		5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
		4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
		6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
	])

	// Helper functions
	const F = (x: number, y: number, z: number): number => (x & y) | (~x & z)
	const G = (x: number, y: number, z: number): number => (x & z) | (y & ~z)
	const H = (x: number, y: number, z: number): number => x ^ y ^ z
	const I = (x: number, y: number, z: number): number => y ^ (x | ~z)

	const rotl = (x: number, n: number): number => ((x << n) | (x >>> (32 - n))) >>> 0

	// Initialize hash values
	let a0 = 0x67452301,
	 b0 = 0xEFCDAB89,
	 c0 = 0x98BADCFE,
	 d0 = 0x10325476

	// Pre-processing: adding padding bits
	const originalLength = message.length
	const bitLength = BigInt(originalLength * 8)

	// Calculate padded length
	let paddedLength = originalLength + 1
	while (paddedLength % 64 !== 56) {
		paddedLength++
	}
	paddedLength += 8

	// Create padded message
	const padded = new Uint8Array(paddedLength)
	padded.set(message)
	padded[originalLength] = 0x80

	// Append original length in bits as 64-bit little-endian
	const lengthView = new DataView(padded.buffer, paddedLength - 8, 8)
	lengthView.setBigUint64(0, bitLength, true)

	// Process each 64-byte chunk
	for (chunkStart = 0; chunkStart < paddedLength; chunkStart += 64) {
		const chunk = new DataView(padded.buffer, chunkStart, 64)

		// Initialize hash value for this chunk
		let A = a0,
		 B = b0,
		 C = c0,
		 D = d0

		// Main loop
		for (let i = 0; i < 64; i++) {
			let f: number,
			 g: number

			if (i < 16) {
				f = F(B, C, D)
				g = i
			} else if (i < 32) {
				f = G(B, C, D)
				g = (5 * i + 1) % 16
			} else if (i < 48) {
				f = H(B, C, D)
				g = (3 * i + 5) % 16
			} else {
				f = I(B, C, D)
				g = (7 * i) % 16
			}

			f = (f + A + K[i] + chunk.getUint32(g * 4, true)) >>> 0
			A = D
			D = C
			C = B
			B = (B + rotl(f, S[i])) >>> 0
		}

		// Add this chunk's hash to result so far
		a0 = (a0 + A) >>> 0
		b0 = (b0 + B) >>> 0
		c0 = (c0 + C) >>> 0
		d0 = (d0 + D) >>> 0
	}

	// Produce the final hash value (little-endian)
	const result = new DataView(new ArrayBuffer(16))
	result.setUint32(0, a0, true)
	result.setUint32(4, b0, true)
	result.setUint32(8, c0, true)
	result.setUint32(12, d0, true)

	// Convert to hex string
	const hashBytes = new Uint8Array(result.buffer)
	return Array.from(hashBytes)
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

export const hash: HashAPI = {
	md5,
	sha1,
	sha256,
	crc32,
}
