import { describe, expect, it } from 'vitest'
import trim from '../src/trim'

describe('trim', () => {
	it('should trim whitespace from both sides', () => {
		expect(trim('  hello  ')).toBe('hello')
	})

	it('should handle tabs and newlines', () => {
		expect(trim('\n\thello\t\n')).toBe('hello')
	})

	it('should return original string if no whitespace', () => {
		expect(trim('hello')).toBe('hello')
	})
})
