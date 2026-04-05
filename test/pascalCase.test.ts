import { describe, expect, it } from 'vitest'
import pascalCase from '../src/pascalCase'

describe('pascalCase', () => {
	it('should convert kebab-case to PascalCase', () => {
		expect(pascalCase('foo-bar')).toBe('FooBar')
	})

	it('should convert snake_case to PascalCase', () => {
		expect(pascalCase('foo_bar')).toBe('FooBar')
	})

	it('should convert space separated to PascalCase', () => {
		expect(pascalCase('foo bar')).toBe('FooBar')
	})

	it('should convert camelCase to PascalCase', () => {
		expect(pascalCase('fooBar')).toBe('FooBar')
	})

	it('should handle already PascalCase', () => {
		expect(pascalCase('FooBar')).toBe('FooBar')
	})

	it('should handle consecutive uppercase', () => {
		expect(pascalCase('XML-parser')).toBe('XmlParser')
		expect(pascalCase('HTML-element')).toBe('HtmlElement')
	})

	it('should handle empty string', () => {
		expect(pascalCase('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(pascalCase(null as any)).toBe('')
		expect(pascalCase(undefined as any)).toBe('')
	})
})
