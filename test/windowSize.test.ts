/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest'
import windowSize from '../src/windowSize'

describe('windowSize', () => {
	it('should return window dimensions', () => {
		const result = windowSize()

		expect(result).toHaveProperty('width')
		expect(result).toHaveProperty('height')
		expect(typeof result.width).toBe('number')
		expect(typeof result.height).toBe('number')
	})

	it('should use document.body.clientWidth when innerWidth is not available', () => {
		const originalInnerWidth = window.innerWidth

		// @ts-expect-error - mock innerWidth
		delete window.innerWidth

		// Mock document.body
		Object.defineProperty(document, 'body', {
			value: {
				clientHeight: 600,
				clientWidth: 800,
			},
			configurable: true,
			writable: true,
		})

		const result = windowSize()

		expect(result.width).toBeGreaterThan(0)
		expect(result.height).toBeGreaterThan(0)

		// Restore
		window.innerWidth = originalInnerWidth
	})

	it('should use document.documentElement.clientWidth', () => {
		// Mock document.documentElement
		Object.defineProperty(document, 'documentElement', {
			value: {
				clientHeight: 768,
				clientWidth: 1024,
			},
			configurable: true,
			writable: true,
		})

		const result = windowSize()

		expect(result.width).toBe(1024)
		expect(result.height).toBe(768)
	})
})
