/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createDirectionTracker } from '../src/scroll/getDirection'
import getPosition from '../src/scroll/getPosition'
import getProgress from '../src/scroll/getProgress'
import scrollUtils from '../src/scroll/index'
import isInViewport from '../src/scroll/isInViewport'
import {
	getScrollbarWidth,
	isScrollLocked,
	lockScroll,
	toggleScroll,
	unlockScroll,
} from '../src/scroll/lockScroll'
import scrollTo, { scrollBy, scrollToBottom, scrollToTop } from '../src/scroll/scrollTo'

describe('scroll utilities', () => {
	describe('getPosition', () => {
		beforeEach(() => {
			vi.stubGlobal('scrollY', 0)
		})

		it('should return top when at top', () => {
			vi.stubGlobal('scrollY', 0)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
				writable: true,
			})

			expect(getPosition()).toBe('top')
		})

		it('should return bottom when at bottom', () => {
			vi.stubGlobal('scrollY', 1200)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
				writable: true,
			})

			expect(getPosition()).toBe('bottom')
		})

		it('should return undefined when in middle', () => {
			vi.stubGlobal('scrollY', 500)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
				writable: true,
			})

			expect(getPosition()).toBeUndefined()
		})

		it('should respect custom threshold', () => {
			vi.stubGlobal('scrollY', 1195)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
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
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
				writable: true,
			})

			expect(getProgress()).toBe(0)
		})

		it('should return 100 when at bottom', () => {
			vi.stubGlobal('scrollY', 1200)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
				writable: true,
			})

			expect(getProgress()).toBe(100)
		})

		it('should return correct percentage in middle', () => {
			vi.stubGlobal('scrollY', 600)
			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerHeight', {
				value: 800,
				configurable: true,
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
				value: 800,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerWidth', {
				value: 1200,
				configurable: true,
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
				value: 800,
				configurable: true,
				writable: true,
			})
			Object.defineProperty(window, 'innerWidth', {
				value: 1200,
				configurable: true,
				writable: true,
			})

			expect(isInViewport(mockElement)).toBeFalsy()
		})
	})

	describe('scrollToTop', () => {
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

	describe('scrollTo', () => {
		it('should call window.scrollTo with element selector', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			// Mock querySelector to return an element
			const mockElement = document.createElement('div')
			vi.spyOn(document, 'querySelector').mockReturnValue(mockElement)
			mockElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

			scrollTo('#section')

			expect(scrollToSpy).toHaveBeenCalled()

			scrollToSpy.mockRestore()
		})

		it('should handle element target', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			const mockElement = document.createElement('div')
			mockElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

			scrollTo(mockElement)

			expect(scrollToSpy).toHaveBeenCalled()

			scrollToSpy.mockRestore()
		})

		it('should handle non-existent selector', () => {
			vi.spyOn(document, 'querySelector').mockReturnValue(null)

			// Should not throw
			expect(() => scrollTo('#nonexistent')).not.toThrow()
		})

		it('should scroll to container', () => {
			const mockContainer = {
				scrollTo: vi.fn(),
				scrollTop: 0,
				getBoundingClientRect: () => ({ top: 0 }) as DOMRect,
			} as unknown as Element

			const mockElement = document.createElement('div')
			mockElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

			scrollTo(mockElement, { container: mockContainer })

			expect(mockContainer.scrollTo).toHaveBeenCalled()
		})

		it('should use auto behavior', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			const mockElement = document.createElement('div')
			mockElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

			scrollTo(mockElement, { behavior: 'auto' })

			expect(scrollToSpy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }))

			scrollToSpy.mockRestore()
		})

		it('should use offset', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			const mockElement = document.createElement('div')
			mockElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

			scrollTo(mockElement, { offset: -50 })

			expect(scrollToSpy).toHaveBeenCalled()

			scrollToSpy.mockRestore()
		})
	})

	describe('scrollToBottom', () => {
		it('should call window.scrollTo with scrollHeight', () => {
			const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

			Object.defineProperty(document.documentElement, 'scrollHeight', {
				value: 2000,
				configurable: true,
				writable: true,
			})

			scrollToBottom()

			expect(scrollToSpy).toHaveBeenCalledWith(expect.objectContaining({ top: 2000 }))

			scrollToSpy.mockRestore()
		})

		it('should scroll container to bottom', () => {
			const mockContainer = {
				scrollTo: vi.fn(),
				scrollHeight: 1000,
			} as unknown as Element

			scrollToBottom({ container: mockContainer })

			expect(mockContainer.scrollTo).toHaveBeenCalledWith(
				expect.objectContaining({ top: 1000 })
			)
		})
	})

	describe('scrollBy', () => {
		it('should call window.scrollBy', () => {
			const scrollBySpy = vi.spyOn(window, 'scrollBy').mockImplementation(() => {})

			scrollBy(200)

			expect(scrollBySpy).toHaveBeenCalledWith({ top: 200, behavior: 'smooth' })

			scrollBySpy.mockRestore()
		})

		it('should scroll container by amount', () => {
			const mockContainer = {
				scrollBy: vi.fn(),
			} as unknown as Element

			scrollBy(200, { container: mockContainer })

			expect(mockContainer.scrollBy).toHaveBeenCalledWith(
				expect.objectContaining({ top: 200 })
			)
		})

		it('should use auto behavior', () => {
			const scrollBySpy = vi.spyOn(window, 'scrollBy').mockImplementation(() => {})

			scrollBy(200, { behavior: 'auto' })

			expect(scrollBySpy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }))

			scrollBySpy.mockRestore()
		})
	})

	describe('scrollUtils', () => {
		it('should export all scroll utilities', () => {
			expect(scrollUtils.getPosition).toBe(getPosition)
			expect(scrollUtils.getProgress).toBe(getProgress)
			expect(scrollUtils.createDirectionTracker).toBe(createDirectionTracker)
			expect(scrollUtils.isInViewport).toBe(isInViewport)
			expect(scrollUtils.scrollTo).toBe(scrollTo)
			expect(scrollUtils.scrollToTop).toBe(scrollToTop)
			expect(scrollUtils.scrollToBottom).toBe(scrollToBottom)
			expect(scrollUtils.scrollBy).toBe(scrollBy)
			expect(scrollUtils.lock).toBe(lockScroll)
			expect(scrollUtils.unlock).toBe(unlockScroll)
			expect(scrollUtils.toggle).toBe(toggleScroll)
			expect(scrollUtils.isLocked).toBe(isScrollLocked)
			expect(scrollUtils.getScrollbarWidth).toBe(getScrollbarWidth)
		})
	})
})
