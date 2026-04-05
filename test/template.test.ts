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

	it('should use function as data resolver', () => {
		const compiled = template('Hello, {{ name }}!')
		expect(compiled((path) => ({ name: 'World' }[path]))).toBe('Hello, World!')
	})

	it('should use function resolver with options', () => {
		const result = template('Hello, {{ name }}!', {
			data: (path) => ({ name: 'World' }[path]),
		})
		expect(result()).toBe('Hello, World!')
	})

	it('should not escape when escape option is false', () => {
		const compiled = template('{{ content }}', { escape: false })
		expect(compiled({ content: '<script>alert("xss")</script>' })).toBe('<script>alert("xss")</script>')
	})

	it('should handle nested property with null in path', () => {
		const compiled = template('{{ user.profile.name }}')
		expect(compiled({ user: null })).toBe('')
		expect(compiled({ user: { profile: null } })).toBe('')
	})

	it('should handle non-object value in path', () => {
		const compiled = template('{{ user.name }}')
		expect(compiled({ user: 'string' })).toBe('')
	})

	describe('triple braces with custom delimiters', () => {
		it('should handle triple braces with default delimiters', () => {
			const compiled = template('{{{ html }}}')
			expect(compiled({ html: '<strong>bold</strong>' })).toBe('<strong>bold</strong>')
		})

		it('should NOT treat triple delimiters as raw output with custom delimiters', () => {
			// Triple braces only work with default {{ }} delimiters
			// With custom delimiters, the pattern is different and won't match triple braces
			 
			const compiled = template('$$$ html $$$', { open: '$', close: '$' })
			// With $ as delimiter, $$$ html $$$ matches as: $ + ( html ) + $
			// So it becomes one variable match: "$ html $" (with leading/trailing $)
			expect(compiled({ html: '<strong>bold</strong>' })).toBe(' html ')
		})

		it('should escape HTML with custom delimiters', () => {
			// eslint-disable-next-line no-template-curly-in-string
			const compiled = template('${ content }', { open: '${', close: '}' })
			expect(compiled({ content: '<script>alert("xss")</script>' })).toBe(
				'&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
			)
		})

		it('should handle raw output with escape:false option for custom delimiters', () => {
			// To get raw output with custom delimiters, use escape: false
			// eslint-disable-next-line no-template-curly-in-string
			const compiled = template('${ content }', { open: '${', close: '}', escape: false })
			expect(compiled({ content: '<strong>bold</strong>' })).toBe('<strong>bold</strong>')
		})
	})

	describe('edge cases', () => {
		it('should handle template with only delimiters', () => {
			// Empty variable name inside delimiters - the regex requires at least one character
			const compiled = template('{{}}')
			// This won't match because the regex is \s*([\s\S]+?)\s* which requires content
			expect(compiled({})).toBe('{{}}')
		})

		it('should handle multiple triple braces', () => {
			const compiled = template('{{{ a }}} and {{{ b }}}')
			expect(compiled({ a: '<a>', b: '<b>' })).toBe('<a> and <b>')
		})

		it('should handle mixed double and triple braces', () => {
			const compiled = template('{{ escaped }} and {{{ raw }}}')
			expect(compiled({ escaped: '<script>', raw: '<script>' })).toBe(
				'&lt;script&gt; and <script>',
			)
		})

		it('should handle whitespace in variable names', () => {
			const compiled = template('{{  name  }}')
			expect(compiled({ name: 'World' })).toBe('World')
		})

		it('should handle numbers in values', () => {
			const compiled = template('{{ num }}')
			expect(compiled({ num: 42 })).toBe('42')
		})

		it('should handle boolean in values', () => {
			const compiled = template('{{ bool }}')
			expect(compiled({ bool: true })).toBe('true')
		})

		it('should handle zero in values', () => {
			const compiled = template('{{ num }}')
			expect(compiled({ num: 0 })).toBe('0')
		})

		it('should handle false in values', () => {
			const compiled = template('{{ bool }}')
			expect(compiled({ bool: false })).toBe('false')
		})
	})
})
