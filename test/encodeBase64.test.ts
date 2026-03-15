import { describe, expect, it } from 'vitest'
import decodeBase64 from '../src/decodeBase64'
import encodeBase64 from '../src/encodeBase64'

describe('encodeBase64', () => {
	it('should encode string to base64', () => {
		expect(encodeBase64('hello')).toBe('aGVsbG8=')
	})

	it('should encode empty string', () => {
		expect(encodeBase64('')).toBe('')
	})

	it('should encode Chinese characters', () => {
		expect(encodeBase64('测试')).toBe('5rWL6K+V')
	})

	it('should encode numbers', () => {
		expect(encodeBase64('123')).toBe('MTIz')
	})
})

describe('decodeBase64', () => {
	it('should decode base64 string', () => {
		expect(decodeBase64('aGVsbG8=')).toBe('hello')
	})

	it('should decode empty string', () => {
		expect(decodeBase64('')).toBe('')
	})

	it('should decode Chinese characters', () => {
		expect(decodeBase64('5rWL6K+V')).toBe('测试')
	})

	it('should be reversible', () => {
		const original = 'Hello, 世界!'
		const encoded = encodeBase64(original)

		expect(decodeBase64(encoded)).toBe(original)
	})
})
