import { describe, expect, it } from 'vitest'
import template from '../src/template'

describe('template', () => {
	it('should interpolate variables', () => {
		const compiled = template('Hello, {{ name }}!')
		expect(compiled({ name: 'World' })).toBe('Hello, World!')
	})

	it('should interpolate with direct data option', () => {
		const result = template('Hello, {{ name }}!', { data: { name: 'World' } })
		expect(result()).toBe('Hello, World!')
	})

	it('should escape HTML by default', () => {
		const compiled = template('{{ content }}')
		expect(compiled({ content: '<script>alert("xss")</script>' })).toBe(
			'&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
		)
	})

	it('should not escape with triple braces', () => {
		const compiled = template('{{{ html }}}')
		expect(compiled({ html: '<strong>bold</strong>' })).toBe('<strong>bold</strong>')
	})

	it('should handle nested properties', () => {
		const compiled = template('{{ user.name }} is {{ user.age }} years old.')
		expect(compiled({ user: { name: 'John', age: 30 } })).toBe('John is 30 years old.')
	})

	it('should handle custom delimiters', () => {
		// eslint-disable-next-line no-template-curly-in-string
		const compiled = template('Hello, ${ name }!', { open: '${', close: '}' })
		expect(compiled({ name: 'World' })).toBe('Hello, World!')
	})

	it('should handle missing variables', () => {
		const compiled = template('Hello, {{ name }}!')
		expect(compiled({})).toBe('Hello, !')
	})

	it('should handle null and undefined values', () => {
		const compiled = template('Value: {{ value }}')
		expect(compiled({ value: null })).toBe('Value: ')
		expect(compiled({ value: undefined })).toBe('Value: ')
	})

	it('should handle empty string', () => {
		const compiled = template('')
		expect(compiled({})).toBe('')
	})

	it('should handle non-string input', () => {
		const compiled = template(null as any)
		expect(compiled({})).toBe('')
	})

	it('should handle multiple variables', () => {
		const compiled = template('{{ a }} and {{ b }} and {{ c }}')
		expect(compiled({ a: 1, b: 2, c: 3 })).toBe('1 and 2 and 3')
	})

	it('should handle special characters in values', () => {
		const compiled = template('{{ value }}')
		expect(compiled({ value: '"quotes" & <angles>' })).toBe('&quot;quotes&quot; &amp; &lt;angles&gt;')
	})
})
