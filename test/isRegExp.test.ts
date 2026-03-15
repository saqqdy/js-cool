import { describe, expect, it } from 'vitest'
import isRegExp from '../src/isRegExp'

describe('isRegExp', () => {
	it('should return true for RegExp', () => {
		expect(isRegExp(/\d/)).toBeTruthy()
		// eslint-disable-next-line prefer-regex-literals
		expect(isRegExp(new RegExp('test'))).toBeTruthy()
	})

	it('should return false for non-RegExp', () => {
		expect(isRegExp({})).toBeFalsy()
		expect(isRegExp('/test/')).toBeFalsy()
		expect(isRegExp(123)).toBeFalsy()
	})

	it('should return falsy for null', () => {
		expect(isRegExp(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isRegExp(undefined)).toBeFalsy()
	})
})
