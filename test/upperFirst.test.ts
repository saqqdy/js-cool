import { describe, expect, it } from 'vitest'
import upperFirst from '../src/upperFirst'

describe('upperFirst', () => {
	it('should capitalize first letter', () => {
		expect(upperFirst('saqqdy')).toBe('Saqqdy')
	})

	it('should handle single character', () => {
		expect(upperFirst('a')).toBe('A')
	})

	it('should handle already capitalized string', () => {
		expect(upperFirst('Hello')).toBe('Hello')
	})

	it('should handle empty string', () => {
		expect(upperFirst('')).toBe('')
	})

	it('should handle Chinese characters', () => {
		expect(upperFirst('测试')).toBe('测试')
	})
})
