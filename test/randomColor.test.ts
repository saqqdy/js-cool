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

	describe('alpha option', () => {
		it('should generate color with random alpha', () => {
			const result = randomColor({ alpha: true })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
		})

		it('should generate color with specific alpha', () => {
			const result = randomColor({ alpha: 128 })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
			// Alpha 128 = '80' in hex
			expect(result.endsWith('80')).toBeTruthy()
		})

		it('should generate color with alpha 255 (fully opaque)', () => {
			const result = randomColor({ alpha: 255 })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
			expect(result.endsWith('ff')).toBeTruthy()
		})

		it('should generate color with alpha 0 (fully transparent)', () => {
			const result = randomColor({ alpha: 0 })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
			expect(result.endsWith('00')).toBeTruthy()
		})

		it('should clamp alpha values above 255', () => {
			const result = randomColor({ alpha: 300 })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
			// Should clamp to 255 = 'ff'
			expect(result.endsWith('ff')).toBeTruthy()
		})

		it('should clamp negative alpha values', () => {
			const result = randomColor({ alpha: -50 })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
			// Should clamp to 0 = '00'
			expect(result.endsWith('00')).toBeTruthy()
		})

		it('should work with alpha and min/max', () => {
			const result = randomColor({ min: 200, max: 255, alpha: true })

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
		})

		it('should work with alpha and array values', () => {
			const result = randomColor({
				min: [100, 100, 100],
				max: [200, 200, 200],
				alpha: 200
			})

			expect(result).toMatch(/^#[0-9a-f]{8}$/)
		})

		it('should generate 6-char hex when alpha is false', () => {
			const result = randomColor({ alpha: false })

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})
	})

	describe('options object', () => {
		it('should work with options object', () => {
			const result = randomColor({ min: 100, max: 200 })

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})

		it('should work with only min in options', () => {
			const result = randomColor({ min: 100 })

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})

		it('should work with only max in options', () => {
			const result = randomColor({ max: 200 })

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})

		it('should work with empty options', () => {
			const result = randomColor({})

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})
	})

	describe('array min/max', () => {
		it('should work with array min and number max', () => {
			const result = randomColor([100, 150, 200], 255)

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})

		it('should work with number min and array max', () => {
			const result = randomColor(0, [100, 150, 200])

			expect(result).toMatch(/^#[0-9a-f]{6}$/)
		})
	})
})
