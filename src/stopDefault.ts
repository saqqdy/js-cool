/**
 * Block default events
 *
 * @since 1.0.2
 * @param e - dom's event object
 * @returns - false
 */
function stopDefault(e: Event) {
	if (e && e.preventDefault) {
		e.preventDefault()
	} else {
		;(window as any).event.returnValue = false
	}
	return false
}

export default stopDefault
