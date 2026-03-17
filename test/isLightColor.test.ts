import { describe, expect, it } from 'vitest'
import isLightColor from '../src/isLightColor'

describe('isLightColor', () => {
	it('should return true for white', () => {
		expect(isLightColor('#ffffff')).toBeTruthy()
	})

	it('should return false for black', () => {
		expect(isLightColor('#000000')).toBeFalsy()
	})

	it('should return true for yellow', () => {
		expect(isLightColor('#ffff00')).toBeTruthy()
	})

	it('should return false for dark blue', () => {
		expect(isLightColor('#000080')).toBeFalsy()
	})

	it('should handle 3-digit hex', () => {
		expect(isLightColor('#fff')).toBeTruthy()
	})

	it('should handle rgb string', () => {
		expect(isLightColor('rgb(255, 255, 255)')).toBeTruthy()
	})

	it('should return true for invalid input', () => {
		expect(isLightColor('invalid')).toBeTruthy()
	})
})
