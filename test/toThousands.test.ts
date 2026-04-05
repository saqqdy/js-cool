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

	// New options tests
	it('should use custom separator', () => {
		expect(toThousands(1234567.89, { separator: ' ' })).toBe('1 234 567.89')
		expect(toThousands(1234567.89, { separator: "'" })).toBe("1'234'567.89")
	})

	it('should limit decimals', () => {
		expect(toThousands(1234.5678, { decimals: 2 })).toBe('1,234.57')
		expect(toThousands(1234.5, { decimals: 2 })).toBe('1,234.50')
	})

	it('should add prefix', () => {
		expect(toThousands(1234.56, { prefix: '$' })).toBe('$1,234.56')
		expect(toThousands(1234.56, { prefix: '¥' })).toBe('¥1,234.56')
	})

	it('should add suffix', () => {
		expect(toThousands(98.5, { suffix: '%', decimals: 1 })).toBe('98.5%')
	})

	it('should combine multiple options', () => {
		expect(toThousands(1234567.89, { prefix: '$', separator: ' ', decimals: 2 })).toBe('$1 234 567.89')
		expect(toThousands(1234567, { prefix: '¥', suffix: '元' })).toBe('¥1,234,567元')
	})

	it('should handle zero with prefix and suffix', () => {
		expect(toThousands(0, { prefix: '$' })).toBe('$0')
		expect(toThousands(0, { suffix: '%' })).toBe('0%')
	})
})
