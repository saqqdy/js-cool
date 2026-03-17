import { describe, expect, it } from 'vitest'
import isEmail from '../src/isEmail'

describe('isEmail', () => {
	it('should return true for valid emails', () => {
		expect(isEmail('test@example.com')).toBeTruthy()
		expect(isEmail('test.name@example.co.uk')).toBeTruthy()
		expect(isEmail('user+tag@example.org')).toBeTruthy()
	})

	it('should return false for invalid emails', () => {
		expect(isEmail('invalid-email')).toBeFalsy()
		expect(isEmail('test@')).toBeFalsy()
		expect(isEmail('@example.com')).toBeFalsy()
		expect(isEmail('test@example')).toBeFalsy()
	})

	it('should return false for non-string', () => {
		expect(isEmail(123 as any)).toBeFalsy()
		expect(isEmail(null as any)).toBeFalsy()
	})
})
