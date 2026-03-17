import { describe, expect, it } from 'vitest'
import rgbToHSL from '../src/rgbToHSL'

describe('rgbToHSL', () => {
	it('should convert red to HSL', () => {
		const result = rgbToHSL(255, 0, 0)
		expect(result.h).toBe(0)
		expect(result.s).toBe(100)
		expect(result.l).toBe(50)
	})

	it('should convert green to HSL', () => {
		const result = rgbToHSL(0, 255, 0)
		expect(result.h).toBe(120)
		expect(result.s).toBe(100)
		expect(result.l).toBe(50)
	})

	it('should convert blue to HSL', () => {
		const result = rgbToHSL(0, 0, 255)
		expect(result.h).toBe(240)
		expect(result.s).toBe(100)
		expect(result.l).toBe(50)
	})

	it('should convert gray to HSL', () => {
		const result = rgbToHSL(128, 128, 128)
		expect(result.s).toBe(0)
		expect(result.l).toBe(50)
	})

	it('should convert white to HSL', () => {
		const result = rgbToHSL(255, 255, 255)
		expect(result.l).toBe(100)
	})

	it('should convert black to HSL', () => {
		const result = rgbToHSL(0, 0, 0)
		expect(result.l).toBe(0)
	})
})
