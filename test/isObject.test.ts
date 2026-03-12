import { describe, expect, it } from 'vitest'
import isObject from '../src/isObject'

describe('isObject', () => {
	it('should return true for plain object', () => {
		expect(isObject({})).toBe(true)
	})

	it('should return true for object with properties', () => {
		expect(isObject({ a: 1, b: 2 })).toBe(true)
	})

	it('should return false for array', () => {
		expect(isObject([])).toBe(false)
	})

	it('should return falsy for null', () => {
		expect(isObject(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isObject(undefined)).toBeFalsy()
	})

	it('should return false for primitive values', () => {
		expect(isObject(123)).toBe(false)
		expect(isObject('string')).toBe(false)
		expect(isObject(true)).toBe(false)
	})
})
