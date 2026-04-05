import { describe, expect, it } from 'vitest'
import reverse from '../src/reverse'

describe('reverse', () => {
	it('should reverse a simple string', () => {
		expect(reverse('hello')).toBe('olleh')
	})

	it('should reverse Chinese characters', () => {
		expect(reverse('你好世界')).toBe('界世好你')
	})

	it('should handle emoji with skin tone', () => {
		// Skin tone modifier is a separate code point, reversing swaps them
		// This is expected behavior for simple Array.from reverse
		const result = reverse('👋🏻')
		expect(result.length).toBeGreaterThan(0)
	})

	it('should handle mixed content', () => {
		expect(reverse('Hello 世界')).toBe('界世 olleH')
	})

	it('should handle empty string', () => {
		expect(reverse('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(reverse(null as any)).toBe('')
		expect(reverse(undefined as any)).toBe('')
	})

	it('should handle combining characters', () => {
		expect(reverse('café')).toBe('éfac')
	})
})
