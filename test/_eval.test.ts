import { describe, expect, it } from 'vitest'
import _eval from '../src/_eval'

describe('_eval', () => {
	it('should return function for valid function name', () => {
		const result = _eval('console.log')
		expect(typeof result).toBe('function')
	})

	it('should return undefined for invalid function name', () => {
		const result = _eval('nonExistentFunction')
		expect(result).toBeUndefined()
	})

	it('should return Number constructor', () => {
		const result = _eval('Number')
		expect(result).toBe(Number)
	})

	it('should return String constructor', () => {
		const result = _eval('String')
		expect(result).toBe(String)
	})
})
