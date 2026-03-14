import { describe, expect, it } from 'vitest'
import unescape from '../src/unescape'

describe('unescape', () => {
	it('should unescape HTML special characters', () => {
		expect(unescape('&lt;div&gt;test&lt;br /&gt;string&lt;/div&gt;')).toBe(
			'<div>test<br />string</div>'
		)
	})

	it('should unescape ampersand', () => {
		expect(unescape('a &amp; b')).toBe('a & b')
	})

	it('should unescape quotes', () => {
		expect(unescape('&quot;hello&quot;')).toBe('"hello"')
		expect(unescape('&#39;hello&#39;')).toBe("'hello'")
	})

	it('should handle string without escaped characters', () => {
		expect(unescape('hello world')).toBe('hello world')
	})

	it('should unescape all special characters', () => {
		expect(unescape('&lt;&gt;&amp;&quot;&#39;')).toBe('<>&"\'')
	})
})
