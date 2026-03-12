import { describe, expect, it } from 'vitest'
import getType from '../src/getType'

describe('getType', () => {
	it('should return "array" for array', () => {
		expect(getType([])).toBe('array')
	})

	it('should return "object" for plain object', () => {
		expect(getType({})).toBe('object')
	})

	it('should return "number" for number', () => {
		expect(getType(123)).toBe('number')
	})

	it('should return "string" for string', () => {
		expect(getType('hello')).toBe('string')
	})

	it('should return "boolean" for boolean', () => {
		expect(getType(true)).toBe('boolean')
	})

	it('should return "function" for function', () => {
		expect(getType(() => {})).toBe('function')
	})

	it('should return "null" for null', () => {
		expect(getType(null)).toBe('null')
	})

	it('should return "undefined" for undefined', () => {
		expect(getType(undefined)).toBe('undefined')
	})

	it('should return "date" for Date', () => {
		expect(getType(new Date())).toBe('date')
	})

	it('should return "regexp" for RegExp', () => {
		expect(getType(/test/)).toBe('regexp')
	})
})
