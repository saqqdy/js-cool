import { describe, expect, it } from 'vitest'
import complement from '../src/complement'

describe('complement', () => {
	it('should return complement of arrays', () => {
		expect(complement([1, 2], [2, '33'], [2])).toEqual([1, '33'])
	})

	it('should return empty array when all elements are common', () => {
		expect(complement([1, 2], [1, 2], [1, 2])).toEqual([])
	})

	it('should handle single array', () => {
		// complement with single array: union = [1, 2, 3], intersect = [1, 2, 3]
		// complement = union - intersect = []
		expect(complement([1, 2, 3])).toEqual([])
	})
})
