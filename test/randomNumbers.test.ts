import { describe, expect, it } from 'vitest'
import randomNumbers from '../src/randomNumbers'

describe('randomNumbers', () => {
	it('should return array with one element by default', () => {
		const result = randomNumbers()

		expect(Array.isArray(result)).toBeTruthy()
		expect(result).toHaveLength(1)
	})

	it('should return array with n elements', () => {
		const result = randomNumbers(4, 100)

		expect(result).toHaveLength(4)
	})

	it('should sum to the specified value', () => {
		const result = randomNumbers(4, 100)
		const sum = result.reduce((a: number, b: number) => a + b, 0)

		expect(sum).toBe(100)
	})

	it('should throw error when sum < n with noZero true', () => {
		expect(() => randomNumbers(5, 3, true)).toThrow()
	})

	it('should allow zero when noZero is false', () => {
		const result = randomNumbers(4, 5, false)

		expect(result).toHaveLength(4)
		const sum = result.reduce((a: number, b: number) => a + b, 0)

		expect(sum).toBe(5)
	})
})
