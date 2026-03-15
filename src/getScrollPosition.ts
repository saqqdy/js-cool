/**
 * Get slide to top and bottom return 'top' 'bottom', recommend using limit flow
 *
 * @example
 * ```js
 * // Basic usage
 * const pos = getScrollPosition()
 * // 'top' | 'bottom' | undefined
 *
 * // Use in scroll event
 * window.addEventListener('scroll', () => {
 *   const pos = getScrollPosition()
 *   if (pos === 'bottom') {
 *     loadMore()
 *   } else if (pos === 'top') {
 *     refresh()
 *   }
 * })
 *
 * // With throttle
 * const d = delay()
 * window.addEventListener('scroll', () => {
 *   d.register('scroll', () => {
 *     console.log(getScrollPosition())
 *   }, 100, false)
 * })
 * ```
 * @deprecated will be removed in the next major release.
 * @since 1.0.2
 * @returns - 'top', 'bottom', or undefined
 */
function getScrollPosition(): 'top' | 'bottom' | undefined {
	const innerH =
		window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	const docScrollTop = document.documentElement.scrollTop
	const bodyScrollTop = document.body.scrollTop
	const docScrollHeight = document.documentElement.scrollHeight
	const bodyScrollHeight = document.body.scrollHeight
	let scrollT = 0,
		scrollH = 0

	if (docScrollTop === 0) {
		scrollT = bodyScrollTop
		scrollH = bodyScrollHeight
		if (bodyScrollTop === 0) {
			return 'top'
		}
	} else {
		scrollT = docScrollTop
		scrollH = docScrollHeight
	}
	// if(bodyScrollTop === 0 && docScrollTop === 0){
	//   return 'top';
	// }
	if (innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH) {
		return 'bottom'
	}
}

export default getScrollPosition
