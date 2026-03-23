// Cache storage
let cached: number | undefined

/**
 * Get scrollbar width
 *
 * @example
 * ```js
 * const width = getScrollbarWidth()
 * console.log(width) // e.g., 15 (pixels)
 *
 * // Useful for layout calculations
 * const scrollbarWidth = getScrollbarWidth()
 * document.body.style.paddingRight = `${scrollbarWidth}px`
 * ```
 * @since 2.0.0
 * @returns - Scrollbar width in pixels
 */
function getScrollbarWidth(): number {
	// Check cached value
	if (cached !== undefined) {
		return cached
	}

	// Create temporary elements to measure
	const outer = document.createElement('div')
	outer.style.cssText =
		'visibility:hidden;overflow:scroll;position:absolute;top:-9999px;width:100px'
	document.body.appendChild(outer)

	const inner = document.createElement('div')
	inner.style.width = '100%'
	outer.appendChild(inner)

	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

	document.body.removeChild(outer)

	// Cache the value
	cached = scrollbarWidth

	return scrollbarWidth
}

export default getScrollbarWidth
