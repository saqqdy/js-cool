import { describe, expect, it } from 'vitest'
import isArray from '../src/isArray'

describe('isArray', () => {
	it('should return true for array', () => {
		expect(isArray([])).toBe(true)
		expect(isArray([1, 2, 3])).toBe(true)
		expect(isArray(['a', 'b'])).toBe(true)
	})

	it('should return false for non-array', () => {
		expect(isArray(null)).toBe(false)
		expect(isArray(undefined)).toBe(false)
		expect(isArray({})).toBe(false)
		expect(isArray('string')).toBe(false)
		expect(isArray(123)).toBe(false)
	})
})
