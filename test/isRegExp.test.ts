import { describe, expect, it } from 'vitest'
import isRegExp from '../src/isRegExp'

describe('isRegExp', () => {
	it('should return true for RegExp', () => {
		expect(isRegExp(/\d/)).toBe(true)
		expect(isRegExp(new RegExp('test'))).toBe(true)
	})

	it('should return false for non-RegExp', () => {
		expect(isRegExp({})).toBe(false)
		expect(isRegExp('/test/')).toBe(false)
		expect(isRegExp(123)).toBe(false)
	})

	it('should return falsy for null', () => {
		expect(isRegExp(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isRegExp(undefined)).toBeFalsy()
	})
})
