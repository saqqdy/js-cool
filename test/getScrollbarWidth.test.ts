/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// We need to import the module in a way that allows us to test caching behavior
// Since the module uses a module-level cache, we'll test it via dynamic import
describe('getScrollbarWidth', () => {
	let originalCreateElement: typeof document.createElement, originalBody: typeof document.body

	beforeEach(() => {
		originalCreateElement = document.createElement
		originalBody = document.body
	})

	afterEach(() => {
		document.createElement = originalCreateElement
		Object.defineProperty(document, 'body', {
			value: originalBody,
			writable: true,
			configurable: true,
		})
	})

	it('should return a number', async () => {
		// Clear module cache
		vi.resetModules()
		const { default: getScrollbarWidth } = await import('../src/scroll/getScrollbarWidth')
		const width = getScrollbarWidth()
		expect(typeof width).toBe('number')
		expect(width).toBeGreaterThanOrEqual(0)
	})

	it('should cache the result', async () => {
		vi.resetModules()
		const { default: getScrollbarWidth } = await import('../src/scroll/getScrollbarWidth')
		const width1 = getScrollbarWidth()
		const width2 = getScrollbarWidth()
		expect(width1).toBe(width2)
	})

	it('should measure scrollbar width using DOM elements', async () => {
		vi.resetModules()

		// Mock createElement to return elements with known dimensions
		const mockOuter = {
			style: {} as CSSStyleDeclaration,
			offsetWidth: 100,
			appendChild: vi.fn(),
		} as unknown as HTMLDivElement

		const mockInner = {
			style: {} as CSSStyleDeclaration,
			offsetWidth: 85, // 15px scrollbar width
		} as unknown as HTMLDivElement

		let createElementCallCount = 0
		document.createElement = vi.fn().mockImplementation(() => {
			createElementCallCount++
			if (createElementCallCount === 1) return mockOuter
			return mockInner
		})

		const mockBody = {
			appendChild: vi.fn(),
			removeChild: vi.fn(),
		} as unknown as HTMLElement

		Object.defineProperty(document, 'body', {
			value: mockBody,
			writable: true,
			configurable: true,
		})

		const { default: getScrollbarWidth } = await import('../src/scroll/getScrollbarWidth')
		const width = getScrollbarWidth()

		expect(width).toBe(15) // 100 - 85
		expect(mockBody.appendChild).toHaveBeenCalled()
		expect(mockBody.removeChild).toHaveBeenCalled()
	})

	it('should use cached value on subsequent calls', async () => {
		vi.resetModules()

		let createElementCalls = 0
		const originalCreateElement = document.createElement.bind(document)

		document.createElement = vi.fn().mockImplementation((...args) => {
			createElementCalls++
			return originalCreateElement(...args)
		})

		const { default: getScrollbarWidth } = await import('../src/scroll/getScrollbarWidth')
		getScrollbarWidth()
		const firstCallCount = createElementCalls

		getScrollbarWidth()

		// createElement should not be called again after caching
		expect(createElementCalls).toBe(firstCallCount)
	})

	it('should return 0 when there is no scrollbar', async () => {
		vi.resetModules()

		const mockOuter = {
			style: {} as CSSStyleDeclaration,
			offsetWidth: 100,
			appendChild: vi.fn(),
		} as unknown as HTMLDivElement

		const mockInner = {
			style: {} as CSSStyleDeclaration,
			offsetWidth: 100, // Same width = no scrollbar
		} as unknown as HTMLDivElement

		let createElementCallCount = 0
		document.createElement = vi.fn().mockImplementation(() => {
			createElementCallCount++
			if (createElementCallCount === 1) return mockOuter
			return mockInner
		})

		const mockBody = {
			appendChild: vi.fn(),
			removeChild: vi.fn(),
		} as unknown as HTMLElement

		Object.defineProperty(document, 'body', {
			value: mockBody,
			writable: true,
			configurable: true,
		})

		const { default: getScrollbarWidth } = await import('../src/scroll/getScrollbarWidth')
		const width = getScrollbarWidth()

		expect(width).toBe(0)
	})
})
