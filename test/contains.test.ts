import { describe, expect, it } from 'vitest'
import contains from '../src/contains'

describe('contains', () => {
	it('should return true when array contains item', () => {
		expect(contains([1, 2], 2)).toBe(true)
	})

	it('should return false when array does not contain item', () => {
		expect(contains([1, 2], 3)).toBe(false)
	})

	it('should work with strings', () => {
		expect(contains(['a', 'b', 'c'], 'b')).toBe(true)
		expect(contains(['a', 'b', 'c'], 'd')).toBe(false)
	})

	it('should work with empty array', () => {
		expect(contains([], 1)).toBe(false)
	})
})
