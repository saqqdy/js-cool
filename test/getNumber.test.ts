import { describe, expect, it } from 'vitest'
import getNumber from '../src/getNumber'

describe('getNumber', () => {
	it('should extract number from string', () => {
		expect(getNumber('Chrome123.33')).toBe('123.33')
	})

	it('should extract multiple numbers', () => {
		expect(getNumber('234test.88')).toBe('234.88')
	})

	it('should handle string without numbers', () => {
		expect(getNumber('hello')).toBe('')
	})

	it('should handle pure number string', () => {
		expect(getNumber('123.45')).toBe('123.45')
	})

	it('should handle empty string', () => {
		expect(getNumber('')).toBe('')
	})
})
