/**
 * Get scroll progress as percentage (0-100)
 *
 * @example
 * ```js
 * // Basic usage
 * const progress = getProgress() // 0-100
 *
 * // With custom element
 * const progress = getProgress(document.getElementById('container'))
 *
 * // Use in scroll event
 * window.addEventListener('scroll', () => {
 *   const progress = getProgress()
 *   progressBar.style.width = `${progress}%`
 * })
 * ```
 * @since 2.0.0
 * @param el - Target element, defaults to window
 * @returns - Scroll progress percentage (0-100)
 */
function getProgress(el: Window | Element = window): number {
	const isWindow = el === window

	let scrollTop: number, clientHeight: number, scrollHeight: number

	if (isWindow) {
		scrollTop = window.scrollY
		clientHeight = window.innerHeight
		scrollHeight = document.documentElement.scrollHeight
	} else {
		scrollTop = (el as Element).scrollTop
		clientHeight = (el as Element).clientHeight
		scrollHeight = (el as Element).scrollHeight
	}

	const maxScroll = scrollHeight - clientHeight

	if (maxScroll <= 0) return 100

	return Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
}

export default getProgress
