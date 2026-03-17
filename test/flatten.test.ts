import { describe, expect, it } from 'vitest'
import { flatten, flattenDeep } from '../src/flatten'

describe('flatten', () => {
	it('should flatten a single level', () => {
		// flatten only goes one level deep
		expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]])
	})

	it('should handle empty array', () => {
		expect(flatten([])).toEqual([])
	})

	it('should handle non-array', () => {
		expect(flatten(null as any)).toEqual([])
	})
})

describe('flattenDeep', () => {
	it('should flatten deeply nested arrays', () => {
		expect(flattenDeep([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5])
	})

	it('should handle empty array', () => {
		expect(flattenDeep([])).toEqual([])
	})

	it('should handle non-array', () => {
		expect(flattenDeep(null as any)).toEqual([])
	})

	it('should handle multiple levels of nesting', () => {
		expect(flattenDeep([[[[1]]], [[2]], [3]])).toEqual([1, 2, 3])
	})
})
