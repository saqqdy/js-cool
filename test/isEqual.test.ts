import { describe, expect, it } from 'vitest'
import isEqual from '../src/isEqual'

describe('isEqual', () => {
	it('should return true for equal objects', () => {
		expect(isEqual({ a: 22, b: {} }, { a: 22, b: {} })).toBeTruthy()
	})

	it('should return false for unequal arrays', () => {
		expect(isEqual([1, 2], [2, 1])).toBeFalsy()
	})

	it('should return true for equal arrays', () => {
		expect(isEqual([1, 2], [1, 2])).toBeTruthy()
	})

	it('should return true for NaN', () => {
		expect(isEqual(Number.NaN, Number.NaN)).toBeTruthy()
	})

	it('should return true for primitives', () => {
		expect(isEqual(1, 1)).toBeTruthy()
		expect(isEqual('a', 'a')).toBeTruthy()
		expect(isEqual(true, true)).toBeTruthy()
	})

	it('should return false for different types', () => {
		expect(isEqual(1, '1')).toBeFalsy()
	})

	it('should handle null and undefined', () => {
		expect(isEqual(null, null)).toBeTruthy()
		expect(isEqual(undefined, undefined)).toBeTruthy()
		expect(isEqual(null, undefined)).toBeFalsy()
	})

	it('should handle nested objects', () => {
		expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBeTruthy()
	})
})
