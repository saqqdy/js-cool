import { describe, expect, it } from 'vitest'
import cutCHSString from '../src/cutCHSString'

describe('cutCHSString', () => {
	it('should cut string with Chinese counting as 2 bytes', () => {
		expect(cutCHSString('测试test', 4)).toBe('测试')
	})

	it('should return empty string for empty input', () => {
		expect(cutCHSString('')).toBe('')
	})

	it('should add dots when hasDot is true', () => {
		const result = cutCHSString('测试字符串', 4, true)

		expect(result.endsWith('...')).toBeTruthy()
	})

	it('should handle pure English', () => {
		expect(cutCHSString('hello world', 5)).toBe('hello')
	})

	it('should handle pure Chinese', () => {
		expect(cutCHSString('测试字符串', 4)).toBe('测试')
	})

	it('should not add dots when string is short enough', () => {
		expect(cutCHSString('test', 10, true)).toBe('test')
	})
})
