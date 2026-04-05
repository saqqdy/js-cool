import { describe, expect, it } from 'vitest'
import changeCase from '../src/changeCase'

describe('changeCase', () => {
	it('should convert to kebab-case', () => {
		expect(changeCase('fooBar', 'kebab')).toBe('foo-bar')
	})

	it('should convert to camelCase', () => {
		expect(changeCase('foo-bar', 'camel')).toBe('fooBar')
	})

	it('should convert to PascalCase', () => {
		expect(changeCase('foo_bar', 'pascal')).toBe('FooBar')
	})

	it('should convert to snake_case', () => {
		expect(changeCase('fooBar', 'snake')).toBe('foo_bar')
	})

	it('should convert to CONSTANT_CASE', () => {
		expect(changeCase('fooBar', 'constant')).toBe('FOO_BAR')
	})

	it('should convert to dot.case', () => {
		expect(changeCase('fooBar', 'dot')).toBe('foo.bar')
	})

	it('should convert to Title Case', () => {
		expect(changeCase('foo bar', 'title')).toBe('Foo Bar')
	})

	it('should swap case', () => {
		expect(changeCase('Hello', 'swap')).toBe('hELLO')
	})

	it('should convert to UPPER', () => {
		expect(changeCase('hello', 'upper')).toBe('HELLO')
	})

	it('should convert to lower', () => {
		expect(changeCase('HELLO', 'lower')).toBe('hello')
	})

	it('should upper first', () => {
		expect(changeCase('hello', 'upperFirst')).toBe('Hello')
	})

	it('should lower first', () => {
		expect(changeCase('Hello', 'lowerFirst')).toBe('hello')
	})

	it('should return original string for unknown case type', () => {
		expect(changeCase('Hello', 'unknown' as any)).toBe('Hello')
	})
})
