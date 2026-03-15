/**
 * Return the next zIndex value
 *
 * @example
 * ```js
 * // Default range (5000-10000)
 * nextIndex()
 * // 5001 (or higher based on existing elements)
 *
 * // Custom minimum
 * nextIndex(1000)
 * // 1001
 *
 * // With maximum limit
 * nextIndex(5000, 10000)
 * // 5001 (won't exceed 10000)
 *
 * // Use for modal/overlay
 * modal.style.zIndex = nextIndex()
 *
 * // Use for tooltips
 * tooltip.style.zIndex = nextIndex()
 * ```
 * @since 1.0.2
 * @param min - minimum zIndex value (default: 5000)
 * @param max - maximum zIndex value (default: 10000)
 * @returns - next available zIndex number
 */
// function nextIndex(min = 0, max?: number): number {
// 	const doms = [min]
// 	Array.prototype.forEach.call(document.querySelectorAll('body > *'), e => {
// 		const n = ['SCRIPT', 'META', 'STYLE', 'LINK'].includes(e.tagName)
// 			? 0
// 			: +window.getComputedStyle(e).zIndex || 0
// 		n > min && doms.push(n)
// 	})
// 	// doms.sort((a, b) => b - a)
// 	const index = Math.max(...doms) + 1
// 	return !max || index < max ? index : max
// }
function nextIndex(min = 5000, max = 10000): number {
	const doms = [min]

	Array.prototype.forEach.call(document.querySelectorAll('body > *'), e => {
		const n = ['SCRIPT', 'META', 'STYLE', 'LINK'].includes(e.tagName)
			? 0
			: +window.getComputedStyle(e).zIndex || 0

		n > min && n < max && doms.push(n)
	})
	doms.sort((a, b) => b - a)

	return doms[0] + 1
}

export default nextIndex
