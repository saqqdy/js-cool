import { describe, expect, it } from 'vitest'
import getCHSLength from '../src/getCHSLength'

describe('getCHSLength', () => {
	it('should count Chinese as 2 bytes', () => {
		expect(getCHSLength('测试')).toBe(4)
	})

	it('should count English as 1 byte', () => {
		expect(getCHSLength('test')).toBe(4)
	})

	it('should handle mixed string', () => {
		expect(getCHSLength('测试test')).toBe(8)
	})

	it('should handle empty string', () => {
		expect(getCHSLength('')).toBe(0)
	})

	it('should handle special characters', () => {
		expect(getCHSLength('!@#$')).toBe(4)
	})
})
