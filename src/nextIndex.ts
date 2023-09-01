/**
 * Return the next zIndex value
 *
 * @example
 * ```js
 * nextIndex()
 * // 1
 *
 * nextIndex(1000)
 * // 1001
 *
 * nextIndex(10, 100)
 * // 100
 * ```
 * @param min - optional, minimum value
 * @param max - optional, maximum value
 * @returns - number
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
