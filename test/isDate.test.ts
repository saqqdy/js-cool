import { describe, expect, it } from 'vitest'
import isDate from '../src/isDate'

describe('isDate', () => {
	it('should return true for Date', () => {
		expect(isDate(new Date())).toBe(true)
	})

	it('should return false for non-Date', () => {
		expect(isDate({})).toBe(false)
		expect(isDate('2024-01-01')).toBe(false)
		expect(isDate(123)).toBe(false)
	})

	it('should return falsy for null', () => {
		expect(isDate(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isDate(undefined)).toBeFalsy()
	})
})
