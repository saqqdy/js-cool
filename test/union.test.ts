import { describe, expect, it } from 'vitest'
import union from '../src/union'

describe('union', () => {
	it('should return union of arrays', () => {
		expect(union([1, 2], [2, '33'])).toEqual([1, 2, '33'])
	})

	it('should handle multiple arrays', () => {
		expect(union([1, 2], [2, '33'], [1, 11, 2, '2'])).toEqual([1, 2, '33', 11, '2'])
	})

	it('should handle empty arrays', () => {
		expect(union([], [1, 2])).toEqual([1, 2])
	})

	it('should handle single array', () => {
		expect(union([1, 2, 3])).toEqual([1, 2, 3])
	})

	it('should deduplicate elements', () => {
		expect(union([1, 1, 2], [2, 3])).toEqual([1, 2, 3])
	})
})
