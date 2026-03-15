import { describe, expect, it } from 'vitest'
import isArray from '../src/isArray'

describe('isArray', () => {
	it('should return true for array', () => {
		expect(isArray([])).toBeTruthy()
		expect(isArray([1, 2, 3])).toBeTruthy()
		expect(isArray(['a', 'b'])).toBeTruthy()
	})

	it('should return false for non-array', () => {
		expect(isArray(null)).toBeFalsy()
		expect(isArray(undefined)).toBeFalsy()
		expect(isArray({})).toBeFalsy()
		expect(isArray('string')).toBeFalsy()
		expect(isArray(123)).toBeFalsy()
	})
})
