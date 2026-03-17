import { describe, expect, it } from 'vitest'
import clamp from '../src/clamp'

describe('clamp', () => {
	it('should clamp number within bounds', () => {
		expect(clamp(-10, -5, 5)).toBe(-5)
		expect(clamp(10, -5, 5)).toBe(5)
		expect(clamp(3, -5, 5)).toBe(3)
	})

	it('should work with default lower bound of 0', () => {
		expect(clamp(-10, 5)).toBe(0)
		expect(clamp(3, 5)).toBe(3)
		expect(clamp(10, 5)).toBe(5)
	})

	it('should handle edge cases', () => {
		expect(clamp(5, 0, 5)).toBe(5)
		expect(clamp(0, 0, 5)).toBe(0)
	})
})
