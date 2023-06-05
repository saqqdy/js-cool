import type { AnyFunction, AnyObject } from '../typings/common'

/**
 * removeEvent removes the event delegate created by addEvent
 *
 * @param element - js dom object
 * @param type - The type of the event. No need to add on
 * @param handler - Callback method.
 */
function removeEvent(element: AnyObject, type: string, handler: AnyFunction) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false)
	} else {
		// Removing event handler functions from a hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid]
		}
	}
}

export default removeEvent
