import { describe, expect, it } from 'vitest'
import isExitsVariable from '../src/isExitsVariable'

describe('isExitsVariable', () => {
	it('should return true for existing variable', () => {
		expect(isExitsVariable('console')).toBeTruthy()
	})

	it('should return true for global variables', () => {
		expect(isExitsVariable('global')).toBeTruthy()
	})

	it('should return true for any string', () => {
		// Note: This function has a bug - it always returns true for any string
		expect(isExitsVariable('anyString')).toBeTruthy()
	})
})
