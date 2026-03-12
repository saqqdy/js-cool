import { describe, expect, it } from 'vitest'
import all from '../src/all'

describe('all', () => {
	it('should return true when all elements pass the predicate', () => {
		expect(all([4, 2, 3], (x: number) => x > 1)).toBe(true)
	})

	it('should return false when some elements fail the predicate', () => {
		expect(all([4, 2, 3], (x: number) => x > 2)).toBe(false)
	})

	it('should return true for empty array', () => {
		expect(all([], (x: number) => x > 0)).toBe(true)
	})

	it('should work with strings', () => {
		expect(all(['a', 'b', 'c'], (x: string) => x.length === 1)).toBe(true)
	})
})
