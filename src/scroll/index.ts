/**
 * Scroll utilities collection
 *
 * @example
 * ```js
 * import scrollUtils from 'js-cool/scroll'
 *
 * // Get scroll position
 * scrollUtils.getPosition() // 'top' | 'bottom' | undefined
 *
 * // Get scroll progress
 * scrollUtils.getProgress() // 0-100
 *
 * // Get scroll direction
 * const tracker = scrollUtils.createDirectionTracker()
 * window.addEventListener('scroll', () => console.log(tracker()))
 *
 * // Check if element in viewport
 * scrollUtils.isInViewport(el)
 *
 * // Scroll to element
 * scrollUtils.scrollTo('#section')
 * scrollUtils.scrollToTop()
 * scrollUtils.scrollToBottom()
 *
 * // Lock/unlock scroll
 * scrollUtils.lock()
 * scrollUtils.unlock()
 *
 * // Get scrollbar width
 * scrollUtils.getScrollbarWidth()
 * ```
 * @since 6.0.0
 */

import getPosition from './getPosition'
import getProgress from './getProgress'
import { createDirectionTracker, getDirection } from './getDirection'
import isInViewport from './isInViewport'
import scrollTo, { scrollBy, scrollToBottom, scrollToTop } from './scrollTo'
import {
	getScrollbarWidth,
	isScrollLocked,
	lockScroll,
	toggleScroll,
	unlockScroll,
} from './lockScroll'

const scrollUtils = {
	/** Get scroll position state */
	getPosition,
	/** Get scroll progress (0-100) */
	getProgress,
	/** Get scroll direction (deprecated, use createDirectionTracker) */
	getDirection,
	/** Create scroll direction tracker */
	createDirectionTracker,
	/** Check if element is in viewport */
	isInViewport,
	/** Scroll to element or position */
	scrollTo,
	/** Scroll to top */
	scrollToTop,
	/** Scroll to bottom */
	scrollToBottom,
	/** Scroll by amount */
	scrollBy,
	/** Lock scroll */
	lock: lockScroll,
	/** Unlock scroll */
	unlock: unlockScroll,
	/** Toggle scroll lock */
	toggle: toggleScroll,
	/** Check if scroll is locked */
	isLocked: isScrollLocked,
	/** Get scrollbar width */
	getScrollbarWidth,
}

export {
	getPosition,
	getProgress,
	getDirection,
	createDirectionTracker,
	isInViewport,
	scrollTo,
	scrollToTop,
	scrollToBottom,
	scrollBy,
	lockScroll,
	unlockScroll,
	toggleScroll,
	isScrollLocked,
	getScrollbarWidth,
}
export type { ScrollToOptions, ScrollBehavior } from './scrollTo'

export default scrollUtils
