/**
 * Get scroll direction
 *
 * @example
 * ```js
 * // Basic usage
 * const direction = getDirection()
 * // 'up' | 'down' | null
 *
 * // Hide/show header based on direction
 * window.addEventListener('scroll', throttle(() => {
 *   const dir = getDirection()
 *   if (dir === 'down') header.classList.add('hidden')
 *   else if (dir === 'up') header.classList.remove('hidden')
 * }, 100))
 * ```
 * @since 2.0.0
 * @returns - 'up', 'down', or null (if no previous scroll or at top)
 */
let lastScrollY = window.scrollY

function getDirection(): 'up' | 'down' | null {
	const currentScrollY = window.scrollY

	if (currentScrollY === lastScrollY) return null

	const direction = currentScrollY > lastScrollY ? 'down' : 'up'
	lastScrollY = currentScrollY

	return direction
}

/**
 * Create a scroll direction tracker
 *
 * @example
 * ```js
 * const tracker = createDirectionTracker()
 *
 * window.addEventListener('scroll', throttle(() => {
 *   const dir = tracker()
 *   console.log(dir) // 'up' | 'down' | null
 * }, 100))
 * ```
 */
function createDirectionTracker(): () => 'up' | 'down' | null {
	let lastScrollY = window.scrollY

	return () => {
		const currentScrollY = window.scrollY

		if (currentScrollY === lastScrollY) return null

		const direction = currentScrollY > lastScrollY ? 'down' : 'up'
		lastScrollY = currentScrollY

		return direction
	}
}

export { getDirection, createDirectionTracker }
export default createDirectionTracker
