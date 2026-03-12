import { describe, expect, it } from 'vitest'
import randomString from '../src/randomString'

describe('randomString', () => {
	it('should generate 32-char string by default', () => {
		const result = randomString()
		expect(result.length).toBe(32)
	})

	it('should generate specified length', () => {
		const result = randomString(16)
		expect(result.length).toBe(16)
	})

	it('should generate with options object', () => {
		const result = randomString({ length: 16 })
		expect(result.length).toBe(16)
	})

	it('should generate with special characters', () => {
		const result = randomString(true)
		expect(result.length).toBe(32)
	})

	it('should generate with length and special', () => {
		const result = randomString(16, true)
		expect(result.length).toBe(16)
	})

	it('should generate numbers only', () => {
		const result = randomString({ length: 16, charTypes: 'number' })
		expect(result.length).toBe(16)
		expect(/^\d+$/.test(result)).toBe(true)
	})

	it('should generate without confusing characters', () => {
		const result = randomString({ length: 100, noConfuse: true })
		expect(result.length).toBe(100)
		// When noConfuse is true, excludes: I, L, O, U, V (uppercase), i, l, o, u, v (lowercase), 0, 1, 9 (numbers)
		expect(/[ILOUVilouv019]/.test(result)).toBe(false)
	})

	it('should generate with strict mode', () => {
		const result = randomString({ length: 16, strict: true })
		expect(result.length).toBe(16)
	})

	it('should generate with multiple char types', () => {
		const result = randomString({ length: 32, charTypes: ['uppercase', 'number'] })
		expect(result.length).toBe(32)
	})
})
