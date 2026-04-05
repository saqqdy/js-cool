import { describe, expect, it } from 'vitest'
import dotCase from '../src/dotCase'

describe('dotCase', () => {
	it('should convert camelCase to dot.case', () => {
		expect(dotCase('fooBar')).toBe('foo.bar')
	})

	it('should convert kebab-case to dot.case', () => {
		expect(dotCase('foo-bar')).toBe('foo.bar')
	})

	it('should convert snake_case to dot.case', () => {
		expect(dotCase('foo_bar')).toBe('foo.bar')
	})

	it('should convert space separated to dot.case', () => {
		expect(dotCase('foo bar')).toBe('foo.bar')
	})

	it('should handle PascalCase', () => {
		expect(dotCase('FooBar')).toBe('foo.bar')
	})

	it('should handle empty string', () => {
		expect(dotCase('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(dotCase(null as any)).toBe('')
		expect(dotCase(undefined as any)).toBe('')
	})
})
