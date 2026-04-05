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

	it('should handle multiple consecutive uppercase letters', () => {
		// XMLParser → xml-parser (not x-m-l-parser)
		expect(camel2Dash('XMLParser')).toBe('xml-parser')
		// HTMLElement → html-element (not h-t-m-l-element)
		expect(camel2Dash('HTMLElement')).toBe('html-element')
		// HTTPSConnection → https-connection
		expect(camel2Dash('HTTPSConnection')).toBe('https-connection')
	})

	it('should handle mixed case with consecutive uppercase', () => {
		// XMLHttpRequest → xml-http-request
		expect(camel2Dash('XMLHttpRequest')).toBe('xml-http-request')
	})
})
