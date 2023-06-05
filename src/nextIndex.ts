/**
 * Return the next zIndex value
 *
 * @param min - optional, minimum value
 * @param max - optional, maximum value
 * @returns number
 */
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
