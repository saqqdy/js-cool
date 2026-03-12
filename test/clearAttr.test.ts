import { describe, expect, it } from 'vitest'
import clearAttr from '../src/clearAttr'

describe('clearAttr', () => {
	it('should remove all attributes from HTML tags', () => {
		expect(clearAttr('<div class="test" id="main">content</div>')).toBe('<div>content</div>')
	})

	it('should handle multiple attributes', () => {
		expect(clearAttr('<a href="link" target="_blank">link</a>')).toBe('<a>link</a>')
	})

	it('should handle tags without attributes', () => {
		expect(clearAttr('<div>content</div>')).toBe('<div>content</div>')
	})

	it('should handle multiple tags', () => {
		expect(clearAttr('<div class="a"><span id="b">text</span></div>')).toBe('<div><span>text</span></div>')
	})

	it('should handle self-closing tags', () => {
		expect(clearAttr('<br class="clear" />')).toBe('<br>')
	})
})
