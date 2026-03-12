import { describe, expect, it } from 'vitest'
import unique from '../src/unique'

describe('unique', () => {
	it('should remove duplicates', () => {
		expect(unique([1, 2, 2, '33'])).toEqual([1, 2, '33'])
	})

	it('should handle empty array', () => {
		expect(unique([])).toEqual([])
	})

	it('should preserve order', () => {
		expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
	})

	it('should handle strings', () => {
		expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
	})

	it('should handle mixed types', () => {
		expect(unique([1, '1', 1, '1'])).toEqual([1, '1'])
	})
})
