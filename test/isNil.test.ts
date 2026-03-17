import { describe, expect, it } from 'vitest'
import isNil from '../src/isNil'

describe('isNil', () => {
	it('should return true for null', () => {
		expect(isNil(null)).toBeTruthy()
	})

	it('should return true for undefined', () => {
		expect(isNil(undefined)).toBeTruthy()
	})

	it('should return false for string', () => {
		expect(isNil('')).toBeFalsy()
	})

	it('should return false for number', () => {
		expect(isNil(0)).toBeFalsy()
	})

	it('should return false for boolean', () => {
		expect(isNil(false)).toBeFalsy()
	})

	it('should return false for array', () => {
		expect(isNil([])).toBeFalsy()
	})

	it('should return false for object', () => {
		expect(isNil({})).toBeFalsy()
	})
})
