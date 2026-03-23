/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import getPosition from '../src/scroll/getPosition'
import getProgress from '../src/scroll/getProgress'
import { createDirectionTracker } from '../src/scroll/getDirection'
import isInViewport from '../src/scroll/isInViewport'
import { scrollToTop } from '../src/scroll/scrollTo'
import {
	getScrollbarWidth,
	isScrollLocked,
	lockScroll,
	toggleScroll,
	unlockScroll,
} from '../src/scroll/lockScroll'

describe('scroll utilities', () => {
	describe('getPosition', () => {
		beforeEach(() => {
			vi.stubGlobal('scrollY', 0)
		})

		it('should return top when at top', () => {
			vi.stubGlobal('scrollY', 0)
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

			expect(getPosition()).toBe('top')
		})

		it('should return bottom when at bottom', () => {
			vi.stubGlobal('scrollY', 1200)
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

			expect(getPosition()).toBe('bottom')
		})

		it('should return undefined when in middle', () => {
			vi.stubGlobal('scrollY', 500)
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

			expect(getPosition()).toBeUndefined()
		})

		it('should respect custom threshold', () => {
			vi.stubGlobal('scrollY', 1195)
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

			// Without threshold, not at bottom
			expect(getPosition()).toBeUndefined()

			// With threshold of 10, considered at bottom
			expect(getPosition(window, 10)).toBe('bottom')
		})
	})

	describe('getProgress', () => {
		it('should return 0 when at top', () => {
			vi.stubGlobal('scrollY', 0)
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

			expect(getProgress()).toBe(0)
		})

		it('should return 100 when at bottom', () => {
			vi.stubGlobal('scrollY', 1200)
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

			expect(getProgress()).toBe(100)
		})

		it('should return correct percentage in middle', () => {
			vi.stubGlobal('scrollY', 600)
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

			// 600 / (2000 - 800) = 600 / 1200 = 50
			expect(getProgress()).toBe(50)
		})
	})

	describe('createDirectionTracker', () => {
		it('should track scroll direction', () => {
			vi.stubGlobal('scrollY', 100)
			const tracker = createDirectionTracker()

			// First call after initialization
			vi.stubGlobal('scrollY', 200)
			expect(tracker()).toBe('down')

			// Scroll up
			vi.stubGlobal('scrollY', 150)
			expect(tracker()).toBe('up')

			// No change
			vi.stubGlobal('scrollY', 150)
			expect(tracker()).toBeNull()
		})
	})

	describe('isInViewport', () => {
		it('should return true for element in viewport', () => {
			const mockElement = {
				getBoundingClientRect: () => ({
					top: 100,
					bottom: 200,
					left: 100,
					right: 200,
					width: 100,
					height: 100,
				}),
			} as Element

			Object.defineProperty(window, 'innerHeight', {
				configurable: true,
				value: 800,
				writable: true,
			})
			Object.defineProperty(window, 'innerWidth', {
				configurable: true,
				value: 1200,
				writable: true,
			})

			expect(isInViewport(mockElement)).toBeTruthy()
		})

		it('should return false for element outside viewport', () => {
			const mockElement = {
				getBoundingClientRect: () => ({
					top: -200,
					bottom: -100,
					left: 100,
					right: 200,
					width: 100,
					height: 100,
				}),
			} as Element

			Object.defineProperty(window, 'innerHeight', {
				configurable: true,
				value: 800,
				writable: true,
			})
			Object.defineProperty(window, 'innerWidth', {
				configurable: true,
				value: 1200,
				writable: true,
			})

			expect(isInViewport(mockElement)).toBeFalsy()
		})
	})

	describe('scrollTo', () => {
		it('should call window.scrollTo for window container', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			scrollToTop()
			expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

			scrollToSpy.mockRestore()
		})
	})

	describe('lockScroll', () => {
		beforeEach(() => {
			// Reset scroll lock state
			while (isScrollLocked()) {
				unlockScroll()
			}
		})

		it('should lock scroll', () => {
			expect(isScrollLocked()).toBeFalsy()

			lockScroll()
			expect(isScrollLocked()).toBeTruthy()
			expect(document.body.style.overflow).toBe('hidden')

			unlockScroll()
			expect(isScrollLocked()).toBeFalsy()
		})

		it('should handle multiple locks', () => {
			lockScroll()
			lockScroll()
			expect(isScrollLocked()).toBeTruthy()

			unlockScroll()
			expect(isScrollLocked()).toBeTruthy()

			unlockScroll()
			expect(isScrollLocked()).toBeFalsy()
		})

		it('should toggle scroll lock', () => {
			expect(isScrollLocked()).toBeFalsy()

			toggleScroll()
			expect(isScrollLocked()).toBeTruthy()

			toggleScroll()
			expect(isScrollLocked()).toBeFalsy()
		})
	})

	describe('getScrollbarWidth', () => {
		it('should return a number', () => {
			const width = getScrollbarWidth()
			expect(typeof width).toBe('number')
			expect(width).toBeGreaterThanOrEqual(0)
		})

		it('should cache the result', () => {
			const width1 = getScrollbarWidth()
			const width2 = getScrollbarWidth()
			expect(width1).toBe(width2)
		})
	})
})
