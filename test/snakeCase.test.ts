import { describe, expect, it } from 'vitest'
import snakeCase from '../src/snakeCase'

describe('snakeCase', () => {
	it('should convert space-separated to snake_case', () => {
		expect(snakeCase('Foo Bar')).toBe('foo_bar')
	})

	it('should convert camelCase to snake_case', () => {
		expect(snakeCase('fooBar')).toBe('foo_bar')
	})

	it('should convert kebab-case to snake_case', () => {
		expect(snakeCase('foo-bar')).toBe('foo_bar')
	})

	it('should handle multiple separators', () => {
		expect(snakeCase('--FOO-BAR--')).toBe('foo_bar')
	})

	it('should handle PascalCase', () => {
		expect(snakeCase('FooBarBaz')).toBe('foo_bar_baz')
	})

	it('should handle non-string', () => {
		expect(snakeCase(123 as any)).toBe('')
	})
})
