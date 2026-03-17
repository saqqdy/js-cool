import { describe, expect, it } from 'vitest'
import sum from '../src/sum'

describe('sum', () => {
	it('should sum numbers', () => {
		expect(sum([1, 2, 3, 4])).toBe(10)
	})

	it('should return 0 for empty array', () => {
		expect(sum([])).toBe(0)
	})

	it('should handle negative numbers', () => {
		expect(sum([-1, -2, 3])).toBe(0)
	})

	it('should return 0 for non-array', () => {
		expect(sum(null as any)).toBe(0)
	})
})
