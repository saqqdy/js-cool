import { describe, expect, it } from 'vitest'
import average from '../src/average'

describe('average', () => {
	it('should calculate average', () => {
		expect(average([1, 2, 3, 4])).toBe(2.5)
	})

	it('should handle single element', () => {
		expect(average([5])).toBe(5)
	})

	it('should return NaN for empty array', () => {
		expect(average([])).toBeNaN()
	})

	it('should return NaN for non-array', () => {
		expect(average(null as any)).toBeNaN()
	})
})
