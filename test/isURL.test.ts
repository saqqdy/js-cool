import { describe, expect, it } from 'vitest'
import isURL from '../src/isURL'

describe('isURL', () => {
	it('should return true for valid URLs', () => {
		expect(isURL('https://example.com')).toBeTruthy()
		expect(isURL('http://localhost:3000/path?query=1')).toBeTruthy()
		expect(isURL('ftp://ftp.example.com')).toBeTruthy()
	})

	it('should return false for invalid URLs', () => {
		expect(isURL('invalid-url')).toBeFalsy()
		expect(isURL('example.com')).toBeFalsy() // missing protocol
		expect(isURL('')).toBeFalsy()
	})

	it('should return false for non-string', () => {
		expect(isURL(123 as any)).toBeFalsy()
		expect(isURL(null as any)).toBeFalsy()
	})
})
