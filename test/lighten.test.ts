import { describe, expect, it } from 'vitest'
import lighten from '../src/lighten'

describe('lighten', () => {
	it('should lighten a hex color', () => {
		// 255 + 51 = 306, but max is 255, so red stays 255
		// 0 + 51 = 51, green becomes 51
		// 0 + 51 = 51, blue becomes 51
		expect(lighten('#ff0000', 20)).toBe('#ff3333')
	})

	it('should lighten black', () => {
		// 0 + 127.5 = 127.5, rounded to 127 = 0x7f
		expect(lighten('#000000', 50)).toBe('#7f7f7f')
	})

	it('should not exceed 255', () => {
		expect(lighten('#ffffff', 50)).toBe('#ffffff')
	})

	it('should handle 3-digit hex', () => {
		expect(lighten('#f00', 20)).toBe('#ff3333')
	})

	it('should handle rgb string', () => {
		// lighten by 10% = add 25.5 to each channel
		// 255 + 25.5 = 280.5, capped at 255
		// 0 + 25.5 = 25.5, rounded
		// Result should have red at 255
		const result = lighten('rgb(255, 0, 0)', 10)
		expect(result.startsWith('#ff')).toBeTruthy()
	})

	it('should return original for invalid input', () => {
		expect(lighten('invalid', 10)).toBe('invalid')
	})
})
