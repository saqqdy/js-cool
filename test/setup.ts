// Polyfill for crypto in Node.js environment
import { webcrypto } from 'node:crypto'

if (!globalThis.crypto) {
	globalThis.crypto = webcrypto as unknown as Crypto
}

if (!globalThis.Uint8Array) {
	globalThis.Uint8Array = Uint8Array
}

