import { describe, expect, it } from 'vitest'
import camel2Dash from '../src/camel2Dash'

describe('camel2Dash', () => {
	it('should convert camelCase to dash-case', () => {
		expect(camel2Dash('camelCase')).toBe('camel-case')
	})

	it('should handle single word', () => {
		expect(camel2Dash('word')).toBe('word')
	})

	it('should handle PascalCase', () => {
		expect(camel2Dash('PascalCase')).toBe('pascal-case')
	})

	it('should handle multiple uppercase letters', () => {
		expect(camel2Dash('XMLHttpRequest')).toBe('x-m-l-http-request')
	})
})
