/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import getScrollPosition from '../src/getScrollPosition'

describe('getScrollPosition', () => {
	it('should return top when at top', () => {
		// Mock scroll positions to be at top
		Object.defineProperty(document.documentElement, 'scrollTop', {
			value: 0,
			writable: true,
			configurable: true
		})
		Object.defineProperty(document.body, 'scrollTop', {
			value: 0,
			writable: true,
			configurable: true
		})

		const result = getScrollPosition()
		expect(result).toBe('top')
	})

	it('should return undefined when in middle', () => {
		// Mock scroll positions to be in middle
		Object.defineProperty(document.documentElement, 'scrollTop', {
			value: 100,
			writable: true,
			configurable: true
		})
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			value: 2000,
			writable: true,
			configurable: true
		})
		Object.defineProperty(window, 'innerHeight', {
			value: 800,
			writable: true,
			configurable: true
		})

		const result = getScrollPosition()
		expect(result).toBeUndefined()
	})

	it('should return bottom when at bottom', () => {
		// Mock scroll positions to be at bottom
		Object.defineProperty(document.documentElement, 'scrollTop', {
			value: 1200,
			writable: true,
			configurable: true
		})
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			value: 2000,
			writable: true,
			configurable: true
		})
		Object.defineProperty(window, 'innerHeight', {
			value: 800,
			writable: true,
			configurable: true
		})

		const result = getScrollPosition()
		expect(result).toBe('bottom')
	})

	it('should use body scroll when doc scroll is 0', () => {
		Object.defineProperty(document.documentElement, 'scrollTop', {
			value: 0,
			writable: true,
			configurable: true
		})
		Object.defineProperty(document.body, 'scrollTop', {
			value: 100,
			writable: true,
			configurable: true
		})
		Object.defineProperty(document.body, 'scrollHeight', {
			value: 2000,
			writable: true,
			configurable: true
		})
		Object.defineProperty(window, 'innerHeight', {
			value: 800,
			writable: true,
			configurable: true
		})

		const result = getScrollPosition()
		expect(result).toBeUndefined()
	})
})
