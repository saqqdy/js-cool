import { describe, expect, it } from 'vitest'
import fixNumber from '../src/fixNumber'

describe('fixNumber', () => {
	it('should fix number to 2 decimal places by default', () => {
		expect(fixNumber('100.888')).toBe(100.88)
	})

	it('should not pad missing decimals', () => {
		expect(fixNumber('100.8', 2)).toBe(100.8)
	})

	it('should fix to custom decimal places', () => {
		expect(fixNumber('100.8888', 3)).toBe(100.888)
	})

	it('should handle integer', () => {
		expect(fixNumber('100')).toBe(100)
	})

	it('should throw error for non-number string', () => {
		expect(() => fixNumber('abc')).toThrow()
	})

	it('should handle number input', () => {
		expect(fixNumber(100.888)).toBe(100.88)
	})
})
