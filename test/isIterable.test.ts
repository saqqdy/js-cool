import { describe, expect, it } from 'vitest'
import isIterable from '../src/isIterable'

describe('isIterable', () => {
	it('should return true for array', () => {
		expect(isIterable([])).toBeTruthy()
	})

	it('should return true for string', () => {
		// Strings are iterable in JavaScript
		expect(isIterable('hello')).toBeTruthy()
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

	it('should return false for number', () => {
		// Numbers are not iterable
		expect(isIterable(123 as any)).toBeFalsy()
	})
})
