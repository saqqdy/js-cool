import { describe, expect, it } from 'vitest'
import kebabCase from '../src/kebabCase'

describe('kebabCase', () => {
	it('should convert space-separated to kebab-case', () => {
		expect(kebabCase('Foo Bar')).toBe('foo-bar')
	})

	it('should convert camelCase to kebab-case', () => {
		expect(kebabCase('fooBar')).toBe('foo-bar')
	})

	it('should convert snake_case to kebab-case', () => {
		expect(kebabCase('foo_bar')).toBe('foo-bar')
	})

	it('should handle multiple separators', () => {
		expect(kebabCase('__FOO_BAR__')).toBe('foo-bar')
	})

	it('should handle PascalCase', () => {
		expect(kebabCase('FooBarBaz')).toBe('foo-bar-baz')
	})

	it('should handle non-string', () => {
		expect(kebabCase(123 as any)).toBe('')
	})
})
