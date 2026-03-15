import { describe, expect, it } from 'vitest'
import isPlainObject from '../src/isPlainObject'

describe('isPlainObject', () => {
	it('should return true for plain object', () => {
		expect(isPlainObject({})).toBeTruthy()
	})

	it('should return false for object created by Object.create(null)', () => {
		// Object.create(null) has no prototype, so getPrototypeOf returns null
		// which is not equal to Object.prototype, so it's not a plain object
		const obj = Object.create(null)

		expect(isPlainObject(obj)).toBeFalsy()
	})

	it('should return false for window', () => {
		expect(isPlainObject(globalThis)).toBeFalsy()
	})

	it('should return false for array', () => {
		expect(isPlainObject([])).toBeFalsy()
	})

	it('should return false for null', () => {
		expect(isPlainObject(null)).toBeFalsy()
	})

	it('should return false for function', () => {
		expect(isPlainObject(() => {})).toBeFalsy()
	})
})
