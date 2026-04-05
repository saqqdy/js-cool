import { describe, expect, it } from 'vitest'
import swapCase from '../src/swapCase'

describe('swapCase', () => {
	it('should swap case of each character', () => {
		expect(swapCase('Hello World')).toBe('hELLO wORLD')
	})

	it('should swap case of single word', () => {
		expect(swapCase('JavaScript')).toBe('jAVAsCRIPT')
	})

	it('should handle all uppercase', () => {
		expect(swapCase('ABCDEF')).toBe('abcdef')
	})

	it('should handle all lowercase', () => {
		expect(swapCase('abcdef')).toBe('ABCDEF')
	})

	it('should handle mixed case', () => {
		expect(swapCase('ABCdef')).toBe('abcDEF')
	})

	it('should preserve numbers and special characters', () => {
		expect(swapCase('123abc')).toBe('123ABC')
		expect(swapCase('Hello-World!')).toBe('hELLO-wORLD!')
	})

	it('should handle empty string', () => {
		expect(swapCase('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(swapCase(null as any)).toBe('')
		expect(swapCase(undefined as any)).toBe('')
	})
})
