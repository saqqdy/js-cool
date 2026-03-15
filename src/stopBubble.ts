/**
 * Block bubbling
 *
 * @example
 * ```js
 * // Basic usage
 * document.getElementById('btn').addEventListener('click', function(e) {
 *   stopBubble(e)
 *   console.log('Button clicked, event stopped')
 * })
 *
 * // Prevent parent handler from firing
 * document.getElementById('parent').addEventListener('click', () => {
 *   console.log('Parent clicked')
 * })
 * document.getElementById('child').addEventListener('click', function(e) {
 *   stopBubble(e)
 *   console.log('Child clicked only')
 * })
 *
 * // With inline handler
 * // <div onclick="stopBubble(event)">Content</div>
 * ```
 * @since 1.0.2
 * @param e - dom's event object
 * @returns - false
 */
function stopBubble(e: Event): boolean {
	if (e && e.stopPropagation) {
		// Firefox
		e.stopPropagation() // e.preventDefault();
	} else {
		// IE
		e.cancelBubble = true // e.returnValue = false;
	}

	return false
}

export default stopBubble
