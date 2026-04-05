import { describe, expect, it } from 'vitest'
import constantCase from '../src/constantCase'

describe('constantCase', () => {
	it('should convert kebab-case to CONSTANT_CASE', () => {
		expect(constantCase('foo-bar')).toBe('FOO_BAR')
	})

	it('should convert snake_case to CONSTANT_CASE', () => {
		expect(constantCase('foo_bar')).toBe('FOO_BAR')
	})

	it('should convert space separated to CONSTANT_CASE', () => {
		expect(constantCase('foo bar')).toBe('FOO_BAR')
	})

	it('should convert camelCase to CONSTANT_CASE', () => {
		expect(constantCase('fooBar')).toBe('FOO_BAR')
	})

	it('should handle consecutive uppercase', () => {
		expect(constantCase('XML-parser')).toBe('XML_PARSER')
	})

	it('should handle empty string', () => {
		expect(constantCase('')).toBe('')
	})

	it('should handle non-string input', () => {
		expect(constantCase(null as any)).toBe('')
		expect(constantCase(undefined as any)).toBe('')
	})
})
