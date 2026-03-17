import { describe, expect, it } from 'vitest'
import darken from '../src/darken'

describe('darken', () => {
	it('should darken a hex color', () => {
		// 255 - 51 = 204 = 0xcc
		expect(darken('#ff0000', 20)).toBe('#cc0000')
	})

	it('should darken white', () => {
		// 255 - 127.5 = 127.5, rounded to 128 = 0x80
		expect(darken('#ffffff', 50)).toBe('#808080')
	})

	it('should not go below 0', () => {
		expect(darken('#000000', 50)).toBe('#000000')
	})

	it('should handle 3-digit hex', () => {
		expect(darken('#f00', 20)).toBe('#cc0000')
	})

	it('should handle rgb string', () => {
		// 255 - 25.5 = 229.5, rounded
		expect(darken('rgb(255, 0, 0)', 10)).toBe('#e50000')
	})

	it('should return original for invalid input', () => {
		expect(darken('invalid', 10)).toBe('invalid')
	})
})
