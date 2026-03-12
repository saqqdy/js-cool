import { describe, expect, it } from 'vitest'
import randomNumbers from '../src/randomNumbers'

describe('randomNumbers', () => {
	it('should return array with one element by default', () => {
		const result = randomNumbers()
		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(1)
	})

	it('should return array with n elements', () => {
		const result = randomNumbers(4, 100)
		expect(result.length).toBe(4)
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
		expect(result.length).toBe(4)
		const sum = result.reduce((a: number, b: number) => a + b, 0)
		expect(sum).toBe(5)
	})
})
