import { describe, expect, it } from 'vitest'
import clearHtml from '../src/clearHtml'

describe('clearHtml', () => {
	it('should remove HTML tags', () => {
		expect(clearHtml('<div>hello</div>')).toBe('hello')
	})

	it('should remove tags with attributes', () => {
		expect(clearHtml('<div class="test">content</div>')).toBe('content')
	})

	it('should remove self-closing tags', () => {
		expect(clearHtml('line1<br />line2')).toBe('line1line2')
	})

	it('should remove newlines', () => {
		expect(clearHtml('<div>line1</div>\n<div>line2</div>')).toBe('line1line2')
	})

	it('should handle nested tags', () => {
		expect(clearHtml('<div><span>text</span></div>')).toBe('text')
	})

	it('should handle empty string', () => {
		expect(clearHtml('')).toBe('')
	})
})
