import { describe, expect, it } from 'vitest'
import chunk from '../src/chunk'

describe('chunk', () => {
	it('should chunk array into specified size', () => {
		expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
			['a', 'b'],
			['c', 'd'],
		])
	})

	it('should handle remainder', () => {
		expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']])
	})

	it('should default to size 1', () => {
		expect(chunk(['a', 'b', 'c'])).toEqual([['a'], ['b'], ['c']])
	})

	it('should return empty array for empty input', () => {
		expect(chunk([])).toEqual([])
	})

	it('should handle size larger than array', () => {
		expect(chunk(['a', 'b'], 5)).toEqual([['a', 'b']])
	})
})
