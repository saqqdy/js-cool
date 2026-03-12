import { describe, expect, it } from 'vitest'
import isExitsFunction from '../src/isExitsFunction'

describe('isExitsFunction', () => {
	it('should return true for existing function', () => {
		expect(isExitsFunction('console.log')).toBe(true)
	})

	it('should return true for any valid identifier', () => {
		// Note: _eval uses new Function which treats any valid identifier as truthy
		expect(isExitsFunction('test')).toBe(true)
	})

	it('should return true for built-in functions', () => {
		expect(isExitsFunction('parseInt')).toBe(true)
		expect(isExitsFunction('parseFloat')).toBe(true)
	})

	it('should return true for constructors', () => {
		expect(isExitsFunction('Number')).toBe(true)
		expect(isExitsFunction('String')).toBe(true)
	})
})
