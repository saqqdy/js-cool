import { describe, expect, it } from 'vitest'
import transform from '../src/transform'

describe('transform', () => {
	it('should transform object to array of values', () => {
		const result = transform(
			{ a: 1, b: 2, c: 3 },
			(result, value, key) => {
				result.push({ key, value })
				return result
			},
			[] as Array<{ key: string; value: number }>,
		)
		expect(result).toEqual([
			{ key: 'a', value: 1 },
			{ key: 'b', value: 2 },
			{ key: 'c', value: 3 },
		])
	})

	it('should filter and transform object', () => {
		const result = transform(
			{ a: 1, b: 2, c: 3, d: 4 },
			(result, value, key) => {
				if (value % 2 === 0) {
					result[key] = value * 2
				}
			},
			{} as Record<string, number>,
		)
		expect(result).toEqual({ b: 4, d: 8 })
	})

	it('should support early exit by returning false', () => {
		const result = transform(
			{ a: 1, b: 2, c: 3 },
			(result, value, key) => {
				result[key] = value
				if (key === 'b') return false
			},
			{} as Record<string, number>,
		)
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should transform array to object', () => {
		const result = transform(
			['a', 'b', 'c'],
			(result, value, index) => {
				result[value] = index
			},
			{} as Record<string, number>,
		)
		expect(result).toEqual({ a: 0, b: 1, c: 2 })
	})

	it('should use default empty object accumulator', () => {
		const result = transform({ a: 1, b: 2 }, (result, value, key) => {
			result[key] = value * 2
		})
		expect(result).toEqual({ a: 2, b: 4 })
	})

	it('should use default empty array accumulator for arrays', () => {
		const result = transform([1, 2, 3], (result, value) => {
			result.push(value * 2)
			return result
		})
		expect(result).toEqual([2, 4, 6])
	})

	it('should handle null input', () => {
		const result = transform(null as any, () => {})
		expect(result).toEqual({})
	})

	it('should handle undefined input', () => {
		const result = transform(undefined as any, () => {})
		expect(result).toEqual({})
	})

	it('should handle empty object', () => {
		const result = transform({}, () => {})
		expect(result).toEqual({})
	})

	it('should handle empty array', () => {
		const result = transform([], () => {})
		expect(result).toEqual([])
	})

	it('should use provided accumulator for null input', () => {
		const result = transform(null as any, () => {}, { default: 'value' })
		expect(result).toEqual({ default: 'value' })
	})

	it('should use provided accumulator for undefined input', () => {
		const result = transform(undefined as any, () => {}, ['default'])
		expect(result).toEqual(['default'])
	})

	it('should update accumulator when iteratee returns new value', () => {
		const result = transform({ a: 1, b: 2 }, (result, value, key) => {
			result[key] = value
			return result
		})
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should support early exit in array iteration', () => {
		const result = transform([1, 2, 3, 4, 5], (result, value, index) => {
			result.push(value)
			if (index === 2) return false
		}, [] as number[])
		expect(result).toEqual([1, 2, 3])
	})
})
