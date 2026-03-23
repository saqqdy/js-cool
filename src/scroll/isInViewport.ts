/**
 * Check if element is in viewport
 *
 * @example
 * ```js
 * // Basic usage
 * const el = document.getElementById('box')
 * isInViewport(el) // true | false
 *
 * // With partial visibility
 * isInViewport(el, { fully: false }) // true if any part is visible
 *
 * // Lazy load images
 * const observer = new IntersectionObserver((entries) => {
 *   entries.forEach(entry => {
 *     if (entry.isIntersecting) {
 *       entry.target.src = entry.target.dataset.src
 *     }
 *   })
 * })
 * ```
 * @since 2.0.0
 * @param el - Target element
 * @param options - Options object
 * @param options.fully - If true, check if fully in viewport (default: true)
 * @param options.offset - Offset from viewport edges (default: 0)
 * @returns - true, false, or 'partial' if partially visible
 */
function isInViewport(
	el: Element,
	options: { fully?: boolean; offset?: number } = {}
): boolean | 'partial' {
	const { fully = true, offset = 0 } = options

	const rect = el.getBoundingClientRect()
	const windowHeight = window.innerHeight || document.documentElement.clientHeight
	const windowWidth = window.innerWidth || document.documentElement.clientWidth

	const vertInView =
		rect.top <= windowHeight - offset && rect.top + rect.height >= offset
	const horInView =
		rect.left <= windowWidth - offset && rect.left + rect.width >= offset

	if (!vertInView || !horInView) return false

	// Check if fully in viewport
	if (fully) {
		const fullyVertInView = rect.top >= offset && rect.bottom <= windowHeight - offset
		const fullyHorInView = rect.left >= offset && rect.right <= windowWidth - offset
		return fullyVertInView && fullyHorInView
	}

	return true
}

export default isInViewport
