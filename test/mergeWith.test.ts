import { describe, expect, it } from 'vitest'
import mergeWith from '../src/mergeWith'

describe('mergeWith', () => {
	it('should merge with strategy for arrays (concat)', () => {
		const result = mergeWith(
			{ a: [1, 2] },
			{ a: [3, 4] },
			(objValue, srcValue) => {
				if (Array.isArray(objValue)) {
					return objValue.concat(srcValue)
				}
			},
		)
		expect(result).toEqual({ a: [1, 2, 3, 4] })
	})

	it('should merge with strategy for specific keys', () => {
		const result = mergeWith(
			{ a: 1, b: 2 },
			{ a: 3, c: 4 },
			(objValue, srcValue, key) => {
				if (key === 'a') return (objValue as number) + (srcValue as number)
			},
		)
		expect(result).toEqual({ a: 4, b: 2, c: 4 })
	})

	it('should allow skipping properties', () => {
		const result = mergeWith(
			{ a: 1, b: 2 },
			{ a: 10, b: 20, c: 30 },
			(objValue, srcValue, key) => {
				if (key === 'b') return objValue // keep original
			},
		)
		expect(result).toEqual({ a: 10, b: 2, c: 30 })
	})

	it('should merge multiple objects', () => {
		const result = mergeWith(
			{ a: 1 },
			{ b: 2 },
			{ c: 3 },
			(objValue, srcValue) => srcValue ?? objValue,
		)
		expect(result).toEqual({ a: 1, b: 2, c: 3 })
	})

	it('should handle nested objects', () => {
		const result = mergeWith(
			{ a: { x: 1, y: 2 } },
			{ a: { y: 20, z: 3 } },
			(objValue, srcValue, key) => {
				if (key === 'a') return undefined // use default merge
			},
		)
		expect(result).toEqual({ a: { x: 1, y: 20, z: 3 } })
	})

	it('should handle null/undefined inputs', () => {
		expect(mergeWith(null as any, { a: 1 }, () => {})).toBe(null)
		expect(mergeWith(undefined as any, { a: 1 }, () => {})).toBe(undefined)
	})

	it('should return original object if no strategy function', () => {
		const result = mergeWith({ a: 1 }, { b: 2 })
		expect(result).toEqual({ a: 1 })
	})

	it('should handle empty sources', () => {
		const result = mergeWith({ a: 1 }, () => 1)
		expect(result).toEqual({ a: 1 })
	})

	it('should skip non-object arguments', () => {
		const result = mergeWith({ a: 1 }, null as any, { b: 2 }, () => undefined)
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should handle undefined source value', () => {
		const result = mergeWith(
			{ a: 1 },
			{ a: undefined },
			() => undefined,
		)
		// When strategy returns undefined and srcValue is undefined, it keeps original
		expect(result).toEqual({ a: 1 })
	})

	it('should handle source without hasOwn keys', () => {
		const emptyObj = Object.create({ inherited: 'value' })
		const result = mergeWith({ a: 1 }, emptyObj, () => undefined)
		expect(result).toEqual({ a: 1 })
	})

	it('should skip invalid source objects', () => {
		const result = mergeWith({ a: 1 }, 'string' as any, { b: 2 }, (obj, src) => src)
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('should handle null source in array', () => {
		const result = mergeWith({ a: 1 }, null as any, { b: 2 }, (obj, src) => src)
		expect(result).toEqual({ a: 1, b: 2 })
	})
})
