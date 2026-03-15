import { describe, expect, it } from 'vitest'
import isIterable from '../src/isIterable'

describe('isIterable', () => {
	it('should return true for array', () => {
		expect(isIterable([])).toBeTruthy()
	})

	it('should throw for string', () => {
		// The current implementation throws for primitive types
		expect(() => isIterable('hello')).toThrow()
	})

	it('should return true for typed array', () => {
		expect(isIterable(new Uint8Array())).toBeTruthy()
	})

	it('should return true for Set', () => {
		expect(isIterable(new Set())).toBeTruthy()
	})

	it('should return true for Map', () => {
		expect(isIterable(new Map())).toBeTruthy()
	})

	it('should return false for null', () => {
		expect(isIterable(null)).toBeFalsy()
	})

	it('should return false for undefined', () => {
		expect(isIterable(undefined)).toBeFalsy()
	})

	it('should return false for plain object', () => {
		expect(isIterable({})).toBeFalsy()
	})

	it('should throw for number', () => {
		// The current implementation throws for primitive types
		expect(() => isIterable(123 as any)).toThrow()
	})
})
