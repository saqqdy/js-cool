import { describe, expect, it } from 'vitest'
import isDate from '../src/isDate'

describe('isDate', () => {
	it('should return true for Date', () => {
		expect(isDate(new Date())).toBeTruthy()
	})

	it('should return false for non-Date', () => {
		expect(isDate({})).toBeFalsy()
		expect(isDate('2024-01-01')).toBeFalsy()
		expect(isDate(123)).toBeFalsy()
	})

	it('should return falsy for null', () => {
		expect(isDate(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isDate(undefined)).toBeFalsy()
	})
})
