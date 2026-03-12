import { describe, expect, it } from 'vitest'
import toThousands from '../src/toThousands'

describe('toThousands', () => {
	it('should add thousand separators', () => {
		expect(toThousands(10000000222)).toBe('10,000,000,222')
	})

	it('should handle decimal numbers', () => {
		expect(toThousands(100.2232323)).toBe('100.2232323')
	})

	it('should handle string input', () => {
		expect(toThousands('1234567')).toBe('1,234,567')
	})

	it('should handle zero', () => {
		expect(toThousands(0)).toBe('0')
	})

	it('should handle null', () => {
		expect(toThousands(null)).toBe('')
	})

	it('should handle negative numbers', () => {
		expect(toThousands(-1234567)).toBe('-1,234,567')
	})

	it('should handle string zero', () => {
		expect(toThousands('0')).toBe('0')
	})
})
