import { describe, expect, it } from 'vitest'
import shuffle from '../src/shuffle'

describe('shuffle', () => {
	it('should shuffle array', () => {
		const arr = [1, 2, 3, 4, 5]
		const result = shuffle(arr)
		expect(result.length).toBe(5)
		expect(result.sort()).toEqual([1, 2, 3, 4, 5])
	})

	it('should shuffle string', () => {
		const result = shuffle('abcde')
		expect(result.length).toBe(5)
		expect(result.split('').sort().join('')).toBe('abcde')
	})

	it('should return specified size for array', () => {
		const result = shuffle([1, 2, 3, 4, 5], 3)
		expect(result.length).toBe(3)
	})

	it('should return specified size for string', () => {
		const result = shuffle('abcde', 3)
		expect(result.length).toBe(3)
	})

	it('should handle empty array', () => {
		expect(shuffle([])).toEqual([])
	})

	it('should handle empty string', () => {
		expect(shuffle('')).toBe('')
	})
})
