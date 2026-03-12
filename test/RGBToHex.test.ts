import { describe, expect, it } from 'vitest'
import RGBToHex from '../src/RGBToHex'

describe('RGBToHex', () => {
	it('should convert RGB to hex', () => {
		expect(RGBToHex(255, 165, 1)).toBe('ffa501')
	})

	it('should handle black', () => {
		expect(RGBToHex(0, 0, 0)).toBe('000000')
	})

	it('should handle white', () => {
		expect(RGBToHex(255, 255, 255)).toBe('ffffff')
	})

	it('should handle gray', () => {
		expect(RGBToHex(128, 128, 128)).toBe('808080')
	})

	it('should handle red', () => {
		expect(RGBToHex(255, 0, 0)).toBe('ff0000')
	})

	it('should handle green', () => {
		expect(RGBToHex(0, 255, 0)).toBe('00ff00')
	})

	it('should handle blue', () => {
		expect(RGBToHex(0, 0, 255)).toBe('0000ff')
	})
})
