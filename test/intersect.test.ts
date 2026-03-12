import { describe, expect, it } from 'vitest'
import intersect from '../src/intersect'

describe('intersect', () => {
	it('should return intersection of arrays', () => {
		expect(intersect([1, 2], [2, 3, 4], [2, 8], [2, '33'])).toEqual([2])
	})

	it('should return empty array when no common elements', () => {
		expect(intersect([1, 2], [3, 4], [5, 6])).toEqual([])
	})

	it('should handle single array', () => {
		expect(intersect([1, 2, 3])).toEqual([1, 2, 3])
	})

	it('should handle empty arrays', () => {
		expect(intersect([], [1, 2])).toEqual([])
	})
})
