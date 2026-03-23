import { describe, expect, it } from 'vitest'
import isExitsFunction from '../src/isExitsFunction'

describe('isExitsFunction', () => {
	it('should return true for existing function', () => {
		expect(isExitsFunction('console.log')).toBeTruthy()
	})

	it('should return false for non-existent function', () => {
		expect(isExitsFunction('nonExistentFunction')).toBeFalsy()
		expect(isExitsFunction('some.random.nonExistent')).toBeFalsy()
	})

	it('should return true for built-in functions', () => {
		expect(isExitsFunction('parseInt')).toBeTruthy()
		expect(isExitsFunction('parseFloat')).toBeTruthy()
	})

	it('should return true for constructors', () => {
		expect(isExitsFunction('Number')).toBeTruthy()
		expect(isExitsFunction('String')).toBeTruthy()
	})

	it('should return true for nested functions', () => {
		expect(isExitsFunction('Array.isArray')).toBeTruthy()
		expect(isExitsFunction('JSON.parse')).toBeTruthy()
	})

	it('should return false for non-function values', () => {
		expect(isExitsFunction('document.body')).toBeFalsy()
		expect(isExitsFunction('JSON')).toBeFalsy()
	})
})
