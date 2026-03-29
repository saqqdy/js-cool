/**
 * Scroll to element or position
 *
 * @example
 * ```js
 * // Scroll to element
 * scrollTo('#section-2')
 * scrollTo(document.getElementById('box'))
 *
 * // With offset
 * scrollTo('#header', { offset: -80 })
 *
 * // Instant scroll
 * scrollTo('#footer', { behavior: 'auto' })
 *
 * // Scroll to top/bottom
 * scrollToTop()
 * scrollToBottom()
 *
 * // Scroll by amount
 * scrollBy(200) // scroll down 200px
 * scrollBy(-100) // scroll up 100px
 * ```
 * @since 6.0.0
 */

type ScrollBehavior = 'auto' | 'smooth' | 'instant'

interface ScrollToOptions {
	/** Offset from target position (default: 0) */
	offset?: number
	/** Scroll behavior: 'smooth' or 'auto' (default: 'smooth') */
	behavior?: ScrollBehavior
	/** Scroll container (default: window) */
	container?: Window | Element
}

/**
 * Scroll to element or position
 */
function scrollTo(target: Element | string, options: ScrollToOptions = {}): void {
	const { offset = 0, behavior = 'smooth', container = window } = options

	const el = typeof target === 'string' ? document.querySelector(target) : target

	if (!el) return

	const isWindow = container === window

	if (isWindow) {
		const rect = el.getBoundingClientRect()
		const scrollTop = window.scrollY + rect.top + offset
		window.scrollTo({ top: scrollTop, behavior })
	} else {
		const containerRect = (container as Element).getBoundingClientRect()
		const elRect = el.getBoundingClientRect()
		const scrollTop = (container as Element).scrollTop + elRect.top - containerRect.top + offset
		;(container as Element).scrollTo({ top: scrollTop, behavior })
	}
}

/**
 * Scroll to top of page
 */
function scrollToTop(options: Omit<ScrollToOptions, 'offset'> = {}): void {
	const { behavior = 'smooth', container = window } = options

	if (container === window) {
		window.scrollTo({ top: 0, behavior })
	} else {
		;(container as Element).scrollTo({ top: 0, behavior })
	}
}

/**
 * Scroll to bottom of page
 */
function scrollToBottom(options: Omit<ScrollToOptions, 'offset'> = {}): void {
	const { behavior = 'smooth', container = window } = options

	if (container === window) {
		const scrollHeight = document.documentElement.scrollHeight
		window.scrollTo({ top: scrollHeight, behavior })
	} else {
		const el = container as Element
		el.scrollTo({ top: el.scrollHeight, behavior })
	}
}

/**
 * Scroll by amount
 */
function scrollBy(amount: number, options: Omit<ScrollToOptions, 'offset'> = {}): void {
	const { behavior = 'smooth', container = window } = options

	if (container === window) {
		window.scrollBy({ top: amount, behavior })
	} else {
		;(container as Element).scrollBy({ top: amount, behavior })
	}
}

export { scrollBy, scrollTo, scrollToBottom, scrollToTop }
export type { ScrollBehavior, ScrollToOptions }
export default scrollTo
