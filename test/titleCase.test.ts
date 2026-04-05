import { describe, expect, it } from 'vitest'
import titleCase from '../src/titleCase'

describe('titleCase', () => {
	it('should convert lowercase to Title Case', () => {
		expect(titleCase('hello world')).toBe('Hello World')
	})

	it('should convert kebab-case to Title Case', () => {
		expect(titleCase('foo-bar-baz')).toBe('Foo Bar Baz')
	})

	it('should convert snake_case to Title Case', () => {
		expect(titleCase('foo_bar_baz')).toBe('Foo Bar Baz')
	})

	it('should convert camelCase to Title Case', () => {
		expect(titleCase('fooBarBaz')).toBe('Foo Bar Baz')
	})

	it('should handle empty string', () => {
		expect(titleCase('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(titleCase(null as any)).toBe('')
		expect(titleCase(undefined as any)).toBe('')
	})
})
