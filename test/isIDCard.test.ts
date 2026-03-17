import { describe, expect, it } from 'vitest'
import isIDCard from '../src/isIDCard'

describe('isIDCard', () => {
	it('should return true for valid ID card numbers', () => {
		// Valid ID card (with correct checksum)
		expect(isIDCard('11010519491231002X')).toBeTruthy()
		expect(isIDCard('11010519491231002x')).toBeTruthy() // lowercase x
	})

	it('should return false for invalid ID card numbers', () => {
		expect(isIDCard('123456789012345678')).toBeFalsy() // invalid checksum
		expect(isIDCard('1234567890')).toBeFalsy() // wrong length
		expect(isIDCard('023456789012345678')).toBeFalsy() // starts with 0
	})

	it('should return false for non-string', () => {
		expect(isIDCard('123456789012345678' as any)).toBeFalsy()
		expect(isIDCard(null as any)).toBeFalsy()
	})
})
