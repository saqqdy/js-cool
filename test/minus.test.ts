import { describe, expect, it } from 'vitest'
import minus from '../src/minus'

describe('minus', () => {
	it('should return elements in first array but not in others', () => {
		expect(minus([1, 2], [2, '33'], [2, 4])).toEqual([1])
	})

	it('should return first array when other arrays are empty', () => {
		expect(minus([1, 2, 3], [])).toEqual([1, 2, 3])
	})

	it('should return empty array when all elements are in other arrays', () => {
		expect(minus([1, 2], [1, 2, 3])).toEqual([])
	})

	it('should handle multiple arrays', () => {
		expect(minus([1, 2, 3], [2], [3])).toEqual([1])
	})
})
