/**
 * Get scroll position state (top, bottom, or middle)
 *
 * @example
 * ```js
 * // Basic usage
 * const pos = getPosition()
 * // 'top' | 'bottom' | undefined
 *
 * // With custom element
 * const pos = getPosition(document.getElementById('container'))
 *
 * // With custom threshold
 * const pos = getPosition(window, 5)
 *
 * // Use in scroll event (recommend throttle)
 * window.addEventListener('scroll', throttle(() => {
 *   const pos = getPosition()
 *   if (pos === 'bottom') loadMore()
 * }, 100))
 * ```
 * @since 2.0.0
 * @param el - Target element, defaults to window
 * @param threshold - Threshold for bottom detection (default 1px for float precision)
 * @returns - 'top', 'bottom', or undefined
 */
function getPosition(
	el: Window | Element = window,
	threshold = 1
): 'top' | 'bottom' | undefined {
	const isWindow = el === window

	let scrollTop: number,
	 clientHeight: number,
	 scrollHeight: number

	if (isWindow) {
		scrollTop = window.scrollY
		clientHeight = window.innerHeight
		scrollHeight = document.documentElement.scrollHeight
	} else {
		scrollTop = (el as Element).scrollTop
		clientHeight = (el as Element).clientHeight
		scrollHeight = (el as Element).scrollHeight
	}

	if (scrollTop <= 0) return 'top'

	if (scrollTop + clientHeight >= scrollHeight - threshold) return 'bottom'

	return undefined
}

export default getPosition
