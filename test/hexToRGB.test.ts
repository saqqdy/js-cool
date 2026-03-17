import { describe, expect, it } from 'vitest'
import hexToRGB from '../src/hexToRGB'

describe('hexToRGB', () => {
	it('should convert 6-digit hex to RGB', () => {
		expect(hexToRGB('#ff0000')).toEqual({ b: 0, g: 0, r: 255 })
		expect(hexToRGB('#00ff00')).toEqual({ b: 0, g: 255, r: 0 })
		expect(hexToRGB('#0000ff')).toEqual({ b: 255, g: 0, r: 0 })
	})

	it('should convert 3-digit hex to RGB', () => {
		expect(hexToRGB('#f00')).toEqual({ b: 0, g: 0, r: 255 })
		expect(hexToRGB('#0f0')).toEqual({ b: 0, g: 255, r: 0 })
	})

	it('should handle hex without #', () => {
		expect(hexToRGB('ff0000')).toEqual({ b: 0, g: 0, r: 255 })
	})

	it('should return null for invalid hex', () => {
		expect(hexToRGB('invalid')).toBeNull()
		expect(hexToRGB('#xyz')).toBeNull()
	})

	it('should return null for non-string', () => {
		expect(hexToRGB(123 as any)).toBeNull()
	})
})
