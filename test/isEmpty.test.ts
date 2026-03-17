import { describe, expect, it } from 'vitest'
import isEmpty from '../src/isEmpty'

describe('isEmpty', () => {
	it('should return true for null', () => {
		expect(isEmpty(null)).toBeTruthy()
	})

	it('should return true for undefined', () => {
		expect(isEmpty(undefined)).toBeTruthy()
	})

	it('should return true for empty string', () => {
		expect(isEmpty('')).toBeTruthy()
	})

	it('should return false for non-empty string', () => {
		expect(isEmpty('abc')).toBeFalsy()
	})

	it('should return true for empty array', () => {
		expect(isEmpty([])).toBeTruthy()
	})

	it('should return false for non-empty array', () => {
		expect(isEmpty([1, 2, 3])).toBeFalsy()
	})

	it('should return true for empty object', () => {
		expect(isEmpty({})).toBeTruthy()
	})

	it('should return false for non-empty object', () => {
		expect(isEmpty({ a: 1 })).toBeFalsy()
	})

	it('should return false for number', () => {
		expect(isEmpty(0)).toBeFalsy()
		expect(isEmpty(1)).toBeFalsy()
	})

	it('should return false for boolean', () => {
		expect(isEmpty(false)).toBeFalsy()
		expect(isEmpty(true)).toBeFalsy()
	})

	it('should return true for empty Map', () => {
		expect(isEmpty(new Map())).toBeTruthy()
	})

	it('should return false for non-empty Map', () => {
		const map = new Map([['a', 1]])
		expect(isEmpty(map)).toBeFalsy()
	})

	it('should return true for empty Set', () => {
		expect(isEmpty(new Set())).toBeTruthy()
	})

	it('should return false for non-empty Set', () => {
		expect(isEmpty(new Set([1]))).toBeFalsy()
	})
})
