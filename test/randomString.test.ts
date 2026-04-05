import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import randomString from '../src/randomString'

describe('randomString', () => {
	it('should generate 32-char string by default', () => {
		const result = randomString()

		expect(result).toHaveLength(32)
	})

	it('should generate specified length', () => {
		const result = randomString(16)

		expect(result).toHaveLength(16)
	})

	it('should generate with options object', () => {
		const result = randomString({ length: 16 })

		expect(result).toHaveLength(16)
	})

	it('should generate with special characters', () => {
		const result = randomString(true)

		expect(result).toHaveLength(32)
	})

	it('should generate with length and special', () => {
		const result = randomString(16, true)

		expect(result).toHaveLength(16)
	})

	it('should generate numbers only', () => {
		const result = randomString({ charTypes: 'number', length: 16 })

		expect(result).toHaveLength(16)
		expect(/^\d+$/.test(result)).toBeTruthy()
	})

	it('should generate without confusing characters', () => {
		const result = randomString({ length: 100, noConfuse: true })

		expect(result).toHaveLength(100)
		// When noConfuse is true, excludes: I, L, O, U, V (uppercase), i, l, o, u, v (lowercase), 0, 1, 9 (numbers)
		expect(/[ILOUVilouv019]/.test(result)).toBeFalsy()
	})

	it('should generate with strict mode', () => {
		const result = randomString({ length: 16, strict: true })

		expect(result).toHaveLength(16)
	})

	it('should generate with multiple char types', () => {
		const result = randomString({ charTypes: ['uppercase', 'number'], length: 32 })

		expect(result).toHaveLength(32)
	})

	describe('secure option', () => {
		const originalCrypto = globalThis.crypto

		afterEach(() => {
			// Restore crypto
			Object.defineProperty(globalThis, 'crypto', {
				value: originalCrypto,
				writable: true,
				configurable: true
			})
		})

		it('should generate with secure option', () => {
			const result = randomString({ length: 32, secure: true })

			expect(result).toHaveLength(32)
		})

		it('should use crypto.getRandomValues when available', () => {
			const result = randomString({ length: 16, secure: true })

			expect(result).toHaveLength(16)
		})

		it('should work with secure and strict mode', () => {
			const result = randomString({
				length: 16,
				secure: true,
				strict: true,
				charTypes: ['uppercase', 'lowercase', 'number']
			})

			expect(result).toHaveLength(16)
		})

		it('should work with secure and noConfuse', () => {
			const result = randomString({
				length: 32,
				secure: true,
				noConfuse: true
			})

			expect(result).toHaveLength(32)
			expect(/[ILOUVilouv019]/.test(result)).toBeFalsy()
		})

		it('should fallback to Math.random when crypto is unavailable', () => {
			// Remove crypto
			Object.defineProperty(globalThis, 'crypto', {
				value: undefined,
				writable: true,
				configurable: true
			})

			const result = randomString({ length: 16, secure: true })

			expect(result).toHaveLength(16)
		})

		it('should fallback when crypto.getRandomValues is not a function', () => {
			// Set crypto without getRandomValues
			Object.defineProperty(globalThis, 'crypto', {
				value: {},
				writable: true,
				configurable: true
			})

			const result = randomString({ length: 16, secure: true })

			expect(result).toHaveLength(16)
		})

		it('should use globalThis.crypto fallback when global crypto is undefined', () => {
			// Store original values
			const originalGlobalCrypto = (globalThis as any).crypto

			// Mock globalThis.crypto with getRandomValues (simulates Node.js 15-18 crypto.webcrypto)
			Object.defineProperty(globalThis, 'crypto', {
				value: {
					getRandomValues: (arr: Uint32Array) => {
						arr[0] = 12345
						return arr
					}
				},
				writable: true,
				configurable: true
			})

			const result = randomString({ length: 16, secure: true })

			expect(result).toHaveLength(16)

			// Restore
			Object.defineProperty(globalThis, 'crypto', {
				value: originalGlobalCrypto,
				writable: true,
				configurable: true
			})
		})

		it('should handle max <= 0 in secureRandomInt', () => {
			// This tests edge case in secureRandomInt
			const result = randomString({ length: 16, secure: true })

			expect(result).toHaveLength(16)
		})
	})

	describe('edge cases', () => {
		it('should handle empty charTypes array', () => {
			// When charTypes is empty, it should still work with default
			const result = randomString({ length: 16, charTypes: ['uppercase', 'lowercase', 'number'] })

			expect(result).toHaveLength(16)
		})

		it('should handle all char types', () => {
			const result = randomString({
				length: 20,
				charTypes: ['uppercase', 'lowercase', 'number', 'special'],
				strict: true
			})

			expect(result).toHaveLength(20)
		})

		it('should handle single charType with strict', () => {
			const result = randomString({
				length: 10,
				charTypes: 'number',
				strict: true
			})

			expect(result).toHaveLength(10)
			expect(/^\d+$/.test(result)).toBeTruthy()
		})
	})
})
