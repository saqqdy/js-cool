/**
 * Block bubbling
 *
 * @param e - dom's event object
 * @returns bool false
 */
function stopBubble(e: Event) {
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
