import { describe, expect, it } from 'vitest'
import any from '../src/any'

describe('any', () => {
	it('should return true when some elements pass the predicate', () => {
		expect(any([0, 1, 2, 0], (x: number) => x >= 2)).toBe(true)
	})

	it('should return false when no elements pass the predicate', () => {
		expect(any([0, 0, 0], (x: number) => x > 0)).toBe(false)
	})

	it('should return false for empty array', () => {
		expect(any([], (x: number) => x > 0)).toBe(false)
	})

	it('should work with strings', () => {
		expect(any(['a', 'b', 'c'], (x: string) => x === 'b')).toBe(true)
	})
})
