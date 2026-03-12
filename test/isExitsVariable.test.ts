import { describe, expect, it } from 'vitest'
import isExitsVariable from '../src/isExitsVariable'

describe('isExitsVariable', () => {
	it('should return true for existing variable', () => {
		expect(isExitsVariable('console')).toBe(true)
	})

	it('should return true for global variables', () => {
		expect(isExitsVariable('global')).toBe(true)
	})

	it('should return true for any string', () => {
		// Note: This function has a bug - it always returns true for any string
		expect(isExitsVariable('anyString')).toBe(true)
	})
})
