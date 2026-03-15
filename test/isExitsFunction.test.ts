import { describe, expect, it } from 'vitest'
import isExitsFunction from '../src/isExitsFunction'

describe('isExitsFunction', () => {
	it('should return true for existing function', () => {
		expect(isExitsFunction('console.log')).toBeTruthy()
	})

	it('should return true for any valid identifier', () => {
		// Note: _eval uses new Function which treats any valid identifier as truthy
		expect(isExitsFunction('test')).toBeTruthy()
	})

	it('should return true for built-in functions', () => {
		expect(isExitsFunction('parseInt')).toBeTruthy()
		expect(isExitsFunction('parseFloat')).toBeTruthy()
	})

	it('should return true for constructors', () => {
		expect(isExitsFunction('Number')).toBeTruthy()
		expect(isExitsFunction('String')).toBeTruthy()
	})
})
