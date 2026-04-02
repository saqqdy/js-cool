import { describe, expect, it } from 'vitest'
import words from '../src/words'

describe('words', () => {
	it('should split words from string with separators', () => {
		expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles'])
	})

	it('should split camelCase words', () => {
		expect(words('camelCaseHTML')).toEqual(['camel', 'Case', 'HTML'])
	})

	it('should split PascalCase words', () => {
		expect(words('PascalCase')).toEqual(['Pascal', 'Case'])
	})

	it('should split snake_case words', () => {
		expect(words('snake_case_string')).toEqual(['snake', 'case', 'string'])
	})

	it('should split kebab-case words', () => {
		expect(words('kebab-case-string')).toEqual(['kebab', 'case', 'string'])
	})

	it('should handle custom pattern', () => {
		expect(words('camelCaseHTML', /[A-Z]{2,}/g)).toEqual(['HTML'])
		expect(words('hello world', /\w+/g)).toEqual(['hello', 'world'])
	})

	it('should handle string pattern', () => {
		expect(words('hello world', '\\w+')).toEqual(['hello', 'world'])
	})

	it('should handle empty string', () => {
		expect(words('')).toEqual([])
	})

	it('should handle non-string input', () => {
		expect(words(null as any)).toEqual([])
		expect(words(undefined as any)).toEqual([])
	})

	it('should handle string with numbers', () => {
		expect(words('version2Update')).toEqual(['version', '2', 'Update'])
	})

	it('should handle consecutive uppercase letters', () => {
		expect(words('HTMLParser')).toEqual(['HTML', 'Parser'])
		expect(words('HTTPSConnection')).toEqual(['HTTPS', 'Connection'])
	})
})
