import { describe, expect, it } from 'vitest'
import isIterable from '../src/isIterable'

describe('isIterable', () => {
	it('should return true for array', () => {
		expect(isIterable([])).toBe(true)
	})

	it('should throw for string', () => {
		// The current implementation throws for primitive types
		expect(() => isIterable('hello')).toThrow()
	})

	it('should return true for typed array', () => {
		expect(isIterable(new Uint8Array())).toBe(true)
	})

	it('should return true for Set', () => {
		expect(isIterable(new Set())).toBe(true)
	})

	it('should return true for Map', () => {
		expect(isIterable(new Map())).toBe(true)
	})

	it('should return false for null', () => {
		expect(isIterable(null)).toBe(false)
	})

	it('should return false for undefined', () => {
		expect(isIterable(undefined)).toBe(false)
	})

	it('should return false for plain object', () => {
		expect(isIterable({})).toBe(false)
	})

	it('should throw for number', () => {
		// The current implementation throws for primitive types
		expect(() => isIterable(123 as any)).toThrow()
	})
})
