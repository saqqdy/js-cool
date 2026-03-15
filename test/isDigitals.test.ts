import { describe, expect, it } from 'vitest'
import isDigitals from '../src/isDigitals'

describe('isDigitals', () => {
	it('should return true for string of digits', () => {
		expect(isDigitals('12345')).toBeTruthy()
	})

	it('should return true for empty string', () => {
		expect(isDigitals('')).toBeTruthy()
	})

	it('should return false for string with letters', () => {
		expect(isDigitals('123abc')).toBeFalsy()
	})

	it('should return false for string with special characters', () => {
		expect(isDigitals('123.45')).toBeFalsy()
	})

	it('should return false for string with spaces', () => {
		expect(isDigitals('123 45')).toBeFalsy()
	})
})
