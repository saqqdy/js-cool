import { describe, expect, it } from 'vitest'
import encodeUtf8 from '../src/encodeUtf8'
import decodeUtf8 from '../src/decodeUtf8'

describe('encodeUtf8', () => {
	it('should encode ASCII string', () => {
		expect(encodeUtf8('hello')).toBe('hello')
	})

	it('should encode Chinese characters', () => {
		const result = encodeUtf8('测试')
		expect(typeof result).toBe('string')
	})

	it('should handle empty string', () => {
		expect(encodeUtf8('')).toBe('')
	})
})

describe('decodeUtf8', () => {
	it('should decode UTF-8 string', () => {
		const encoded = encodeUtf8('测试')
		expect(decodeUtf8(encoded)).toBe('测试')
	})

	it('should decode ASCII string', () => {
		expect(decodeUtf8('hello')).toBe('hello')
	})

	it('should be reversible', () => {
		const original = 'Hello, 世界! 123'
		const encoded = encodeUtf8(original)
		expect(decodeUtf8(encoded)).toBe(original)
	})
})
