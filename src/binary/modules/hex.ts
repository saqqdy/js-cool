/**
 * Hex encoding module
 *
 * @module binary/modules/hex
 * @since 6.0.0
 */

import type { HexAPI } from '../types'

/**
 * Encode ArrayBuffer to hex string
 *
 * @example
 * ```ts
 * const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
 * const hex = binary.hex.encode(buffer)
 * // '48656c6c6f'
 * ```
 */
function encode(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer)
	let hex = ''

	for (let i = 0; i < bytes.length; i++) {
		const byte = bytes[i]
		hex += (byte < 16 ? '0' : '') + byte.toString(16)
	}

	return hex
}

/**
 * Decode hex string to ArrayBuffer
 *
 * @example
 * ```ts
 * const buffer = binary.hex.decode('48656c6c6f')
 * // ArrayBuffer with bytes [0x48, 0x65, 0x6c, 0x6c, 0x6f]
 * ```
 */
function decode(hex: string): ArrayBuffer {
	// Remove any whitespace or common prefixes
	hex = hex.replace(/\s/g, '').replace(/^0x/i, '')

	// Validate hex string
	if (!/^[0-9a-fA-F]*$/.test(hex)) {
		throw new Error('Invalid hex string')
	}

	// Pad with leading zero if odd length
	if (hex.length % 2 !== 0) {
		hex = `0${  hex}`
	}

	const bytes = new Uint8Array(hex.length / 2)

	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
	}

	return bytes.buffer
}

export const hex: HexAPI = {
	encode,
	decode,
}
