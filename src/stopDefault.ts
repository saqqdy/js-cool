/**
 * Block default events
 *
 * @example
 * ```js
 * // Prevent form submission
 * document.querySelector('form').addEventListener('submit', function(e) {
 *   stopDefault(e)
 *   console.log('Form submission prevented')
 * })
 *
 * // Prevent link navigation
 * document.querySelector('a').addEventListener('click', function(e) {
 *   stopDefault(e)
 *   console.log('Link navigation prevented')
 * })
 *
 * // Prevent right-click menu
 * document.addEventListener('contextmenu', function(e) {
 *   stopDefault(e)
 *   console.log('Context menu prevented')
 * })
 *
 * // Prevent text selection
 * document.addEventListener('selectstart', function(e) {
 *   stopDefault(e)
 * })
 * ```
 * @since 1.0.2
 * @param e - dom's event object
 * @returns - false
 */
function stopDefault(e: Event): boolean {
	if (e && e.preventDefault) {
		e.preventDefault()
	} else {
		;(window as any).event.returnValue = false
	}

	return false
}

export default stopDefault
