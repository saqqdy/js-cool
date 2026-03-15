/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import getScrollPosition from '../src/getScrollPosition'

describe('getScrollPosition', () => {
	it('should return top when at top', () => {
		// Mock scroll positions to be at top
		Object.defineProperty(document.documentElement, 'scrollTop', {
			configurable: true,
			value: 0,
			writable: true,
		})
		Object.defineProperty(document.body, 'scrollTop', {
			configurable: true,
			value: 0,
			writable: true,
		})

		const result = getScrollPosition()

		expect(result).toBe('top')
	})

	it('should return undefined when in middle', () => {
		// Mock scroll positions to be in middle
		Object.defineProperty(document.documentElement, 'scrollTop', {
			configurable: true,
			value: 100,
			writable: true,
		})
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			configurable: true,
			value: 2000,
			writable: true,
		})
		Object.defineProperty(window, 'innerHeight', {
			configurable: true,
			value: 800,
			writable: true,
		})

		const result = getScrollPosition()

		expect(result).toBeUndefined()
	})

	it('should return bottom when at bottom', () => {
		// Mock scroll positions to be at bottom
		Object.defineProperty(document.documentElement, 'scrollTop', {
			configurable: true,
			value: 1200,
			writable: true,
		})
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			configurable: true,
			value: 2000,
			writable: true,
		})
		Object.defineProperty(window, 'innerHeight', {
			configurable: true,
			value: 800,
			writable: true,
		})

		const result = getScrollPosition()

		expect(result).toBe('bottom')
	})

	it('should use body scroll when doc scroll is 0', () => {
		Object.defineProperty(document.documentElement, 'scrollTop', {
			configurable: true,
			value: 0,
			writable: true,
		})
		Object.defineProperty(document.body, 'scrollTop', {
			configurable: true,
			value: 100,
			writable: true,
		})
		Object.defineProperty(document.body, 'scrollHeight', {
			configurable: true,
			value: 2000,
			writable: true,
		})
		Object.defineProperty(window, 'innerHeight', {
			configurable: true,
			value: 800,
			writable: true,
		})

		const result = getScrollPosition()

		expect(result).toBeUndefined()
	})
})
