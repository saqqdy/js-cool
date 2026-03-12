import { describe, expect, it } from 'vitest'
import isEqual from '../src/isEqual'

describe('isEqual', () => {
	it('should return true for equal objects', () => {
		expect(isEqual({ a: 22, b: {} }, { b: {}, a: 22 })).toBe(true)
	})

	it('should return false for unequal arrays', () => {
		expect(isEqual([1, 2], [2, 1])).toBe(false)
	})

	it('should return true for equal arrays', () => {
		expect(isEqual([1, 2], [1, 2])).toBe(true)
	})

	it('should return true for NaN', () => {
		expect(isEqual(NaN, NaN)).toBe(true)
	})

	it('should return true for primitives', () => {
		expect(isEqual(1, 1)).toBe(true)
		expect(isEqual('a', 'a')).toBe(true)
		expect(isEqual(true, true)).toBe(true)
	})

	it('should return false for different types', () => {
		expect(isEqual(1, '1')).toBe(false)
	})

	it('should handle null and undefined', () => {
		expect(isEqual(null, null)).toBe(true)
		expect(isEqual(undefined, undefined)).toBe(true)
		expect(isEqual(null, undefined)).toBe(false)
	})

	it('should handle nested objects', () => {
		expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true)
	})
})
