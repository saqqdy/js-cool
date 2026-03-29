/**
 * Lock and unlock scroll
 *
 * @example
 * ```js
 * // Lock scroll (e.g., when modal opens)
 * lockScroll()
 *
 * // Unlock scroll (e.g., when modal closes)
 * unlockScroll()
 *
 * // Toggle scroll
 * toggleScroll()
 *
 * // Check if scroll is locked
 * isScrollLocked() // true | false
 * ```
 * @since 2.0.0
 */

let scrollLockCount = 0,
	originalOverflow = '',
	originalPaddingRight = ''

/**
 * Get scrollbar width
 */
function getScrollbarWidth(): number {
	return window.innerWidth - document.documentElement.clientWidth
}

/**
 * Lock scroll
 */
function lockScroll(): void {
	if (scrollLockCount === 0) {
		originalOverflow = document.body.style.overflow
		originalPaddingRight = document.body.style.paddingRight

		const scrollbarWidth = getScrollbarWidth()
		document.body.style.overflow = 'hidden'
		document.body.style.paddingRight = `${scrollbarWidth}px`
	}

	scrollLockCount++
}

/**
 * Unlock scroll
 */
function unlockScroll(): void {
	if (scrollLockCount <= 0) return

	scrollLockCount--

	if (scrollLockCount === 0) {
		document.body.style.overflow = originalOverflow
		document.body.style.paddingRight = originalPaddingRight
	}
}

/**
 * Toggle scroll lock
 */
function toggleScroll(): void {
	if (scrollLockCount > 0) {
		unlockScroll()
	} else {
		lockScroll()
	}
}

/**
 * Check if scroll is locked
 */
function isScrollLocked(): boolean {
	return scrollLockCount > 0
}

export { getScrollbarWidth, isScrollLocked, lockScroll, toggleScroll, unlockScroll }
export default lockScroll
