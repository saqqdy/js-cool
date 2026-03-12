import { describe, expect, it } from 'vitest'
import isDigitals from '../src/isDigitals'

describe('isDigitals', () => {
	it('should return true for string of digits', () => {
		expect(isDigitals('12345')).toBe(true)
	})

	it('should return true for empty string', () => {
		expect(isDigitals('')).toBe(true)
	})

	it('should return false for string with letters', () => {
		expect(isDigitals('123abc')).toBe(false)
	})

	it('should return false for string with special characters', () => {
		expect(isDigitals('123.45')).toBe(false)
	})

	it('should return false for string with spaces', () => {
		expect(isDigitals('123 45')).toBe(false)
	})
})
