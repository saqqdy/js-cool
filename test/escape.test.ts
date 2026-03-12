import { describe, expect, it } from 'vitest'
import escape from '../src/escape'

describe('escape', () => {
	it('should escape HTML special characters', () => {
		expect(escape('<div>test<br />string</div>')).toBe('&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;')
	})

	it('should escape ampersand', () => {
		expect(escape('a & b')).toBe('a &amp; b')
	})

	it('should escape quotes', () => {
		expect(escape('"hello"')).toBe('&quot;hello&quot;')
		expect(escape("'hello'")).toBe('&#39;hello&#39;')
	})

	it('should handle string without special characters', () => {
		expect(escape('hello world')).toBe('hello world')
	})

	it('should escape all special characters', () => {
		expect(escape('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#39;')
	})
})
