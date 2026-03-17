import { describe, expect, it } from 'vitest'
import isPhone from '../src/isPhone'

describe('isPhone', () => {
	it('should return true for valid Chinese phone numbers', () => {
		expect(isPhone('13800138000')).toBeTruthy()
		expect(isPhone('15912345678')).toBeTruthy()
		expect(isPhone('18812345678')).toBeTruthy()
		expect(isPhone('19912345678')).toBeTruthy()
	})

	it('should return false for invalid phone numbers', () => {
		expect(isPhone('12345678901')).toBeFalsy() // starts with 2
		expect(isPhone('1380013800')).toBeFalsy() // too short
		expect(isPhone('138001380001')).toBeFalsy() // too long
		expect(isPhone('02800138000')).toBeFalsy() // starts with 0
	})

	it('should return false for non-string', () => {
		expect(isPhone(13800138000 as any)).toBeFalsy()
		expect(isPhone(null as any)).toBeFalsy()
	})
})
