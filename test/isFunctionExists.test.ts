import { describe, expect, it } from 'vitest'
import isFunctionExists from '../src/isFunctionExists'

describe('isFunctionExists', () => {
	describe('existing functions', () => {
		it('should return true for console.log', () => {
			expect(isFunctionExists('console.log')).toBe(true)
		})

		it('should return true for built-in global functions', () => {
			expect(isFunctionExists('parseInt')).toBe(true)
			expect(isFunctionExists('parseFloat')).toBe(true)
			expect(isFunctionExists('isNaN')).toBe(true)
			expect(isFunctionExists('isFinite')).toBe(true)
			expect(isFunctionExists('encodeURI')).toBe(true)
			expect(isFunctionExists('decodeURI')).toBe(true)
		})

		it('should return true for constructors', () => {
			expect(isFunctionExists('Number')).toBe(true)
			expect(isFunctionExists('String')).toBe(true)
			expect(isFunctionExists('Boolean')).toBe(true)
			expect(isFunctionExists('Array')).toBe(true)
			expect(isFunctionExists('Object')).toBe(true)
			expect(isFunctionExists('Function')).toBe(true)
			expect(isFunctionExists('Date')).toBe(true)
			expect(isFunctionExists('RegExp')).toBe(true)
			expect(isFunctionExists('Error')).toBe(true)
			expect(isFunctionExists('Promise')).toBe(true)
			expect(isFunctionExists('Map')).toBe(true)
			expect(isFunctionExists('Set')).toBe(true)
		})

		it('should return true for nested functions', () => {
			expect(isFunctionExists('Array.isArray')).toBe(true)
			expect(isFunctionExists('JSON.parse')).toBe(true)
			expect(isFunctionExists('JSON.stringify')).toBe(true)
			expect(isFunctionExists('Object.keys')).toBe(true)
			expect(isFunctionExists('Object.values')).toBe(true)
			expect(isFunctionExists('Object.entries')).toBe(true)
		})

		it('should return true for document methods', () => {
			expect(isFunctionExists('document.querySelector')).toBe(true)
			expect(isFunctionExists('document.getElementById')).toBe(true)
			expect(isFunctionExists('document.createElement')).toBe(true)
		})
	})

	describe('non-existent functions', () => {
		it('should return false for non-existent global function', () => {
			expect(isFunctionExists('nonExistentFunction')).toBe(false)
		})

		it('should return false for non-existent nested function', () => {
			expect(isFunctionExists('some.random.nonExistent')).toBe(false)
			expect(isFunctionExists('foo.bar.baz')).toBe(false)
		})

		it('should return false for non-existent method on existing object', () => {
			expect(isFunctionExists('JSON.nonExistent')).toBe(false)
			expect(isFunctionExists('Array.nonExistent')).toBe(false)
			expect(isFunctionExists('Object.nonExistent')).toBe(false)
		})
	})

	describe('non-function values', () => {
		it('should return false for object properties that are not functions', () => {
			expect(isFunctionExists('document.body')).toBe(false)
			expect(isFunctionExists('document.documentElement')).toBe(false)
		})

		it('should return false for objects', () => {
			expect(isFunctionExists('JSON')).toBe(false)
			expect(isFunctionExists('Math')).toBe(false)
			expect(isFunctionExists('document')).toBe(false)
			expect(isFunctionExists('window')).toBe(false)
		})

		it('should return false for Math methods (Math is an object)', () => {
			// Math methods exist but Math itself is not a function
			expect(isFunctionExists('Math')).toBe(false)
		})
	})

	describe('edge cases', () => {
		it('should return false for empty string', () => {
			expect(isFunctionExists('')).toBe(false)
		})

		it('should handle deeply nested paths', () => {
			expect(isFunctionExists('a.b.c.d.e.f')).toBe(false)
		})

		it('should return false for null/undefined intermediate values', () => {
			expect(isFunctionExists('null.something')).toBe(false)
			expect(isFunctionExists('undefined.something')).toBe(false)
		})
	})
})
