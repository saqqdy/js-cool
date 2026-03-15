import { describe, expect, it } from 'vitest'
import isObject from '../src/isObject'

describe('isObject', () => {
	it('should return true for plain object', () => {
		expect(isObject({})).toBeTruthy()
	})

	it('should return true for object with properties', () => {
		expect(isObject({ a: 1, b: 2 })).toBeTruthy()
	})

	it('should return false for array', () => {
		expect(isObject([])).toBeFalsy()
	})

	it('should return falsy for null', () => {
		expect(isObject(null)).toBeFalsy()
	})

	it('should return falsy for undefined', () => {
		expect(isObject(undefined)).toBeFalsy()
	})

	it('should return false for primitive values', () => {
		expect(isObject(123)).toBeFalsy()
		expect(isObject('string')).toBeFalsy()
		expect(isObject(true)).toBeFalsy()
	})
})
