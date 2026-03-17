import { describe, expect, it } from 'vitest'
import sampleSize from '../src/sampleSize'

describe('sampleSize', () => {
	it('should return n random elements', () => {
		const array = [1, 2, 3, 4, 5]
		const result = sampleSize(array, 2)
		expect(result).toHaveLength(2)
		result.forEach(item => expect(array).toContain(item))
	})

	it('should return all elements when n > array.length', () => {
		const array = [1, 2, 3]
		const result = sampleSize(array, 4)
		expect(result).toHaveLength(3)
	})

	it('should return empty array for empty input', () => {
		expect(sampleSize([], 2)).toEqual([])
	})

	it('should return empty array for non-array', () => {
		expect(sampleSize(null as any, 2)).toEqual([])
	})

	it('should default to n=1', () => {
		const array = [1, 2, 3]
		const result = sampleSize(array)
		expect(result).toHaveLength(1)
	})
})
