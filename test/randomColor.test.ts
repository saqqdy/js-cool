import { describe, expect, it } from 'vitest'
import randomColor from '../src/randomColor'

describe('randomColor', () => {
	it('should generate random hex color', () => {
		const result = randomColor()

		expect(result).toMatch(/^#[0-9a-f]{6}$/)
	})

	it('should generate color with min value', () => {
		const result = randomColor(200)

		expect(result).toMatch(/^#[0-9a-f]{6}$/)
	})

	it('should generate color with min and max values', () => {
		const result = randomColor(200, 255)

		expect(result).toMatch(/^#[0-9a-f]{6}$/)
	})

	it('should generate color with array values', () => {
		const result = randomColor([0, 0, 0], [255, 255, 255])

		expect(result).toMatch(/^#[0-9a-f]{6}$/)
	})

	it('should handle min = 0', () => {
		const result = randomColor(0)

		expect(result).toMatch(/^#[0-9a-f]{6}$/)
	})
})
