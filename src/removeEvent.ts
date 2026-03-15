import type { AnyFunction, AnyObject } from './types'

/**
 * removeEvent removes the event delegate created by addEvent
 *
 * @example
 * ```js
 * // Basic usage
 * const btn = document.getElementById('btn')
 * const handler = function(e) { console.log('clicked') }
 * addEvent(btn, 'click', handler)
 * // Later...
 * removeEvent(btn, 'click', handler)
 *
 * // Remove multiple events
 * const input = document.querySelector('input')
 * const focusHandler = () => console.log('focus')
 * const blurHandler = () => console.log('blur')
 * addEvent(input, 'focus', focusHandler)
 * addEvent(input, 'blur', blurHandler)
 * removeEvent(input, 'focus', focusHandler)
 * removeEvent(input, 'blur', blurHandler)
 * ```
 * @since 1.0.2
 * @param element - js dom object
 * @param type - The type of the event. No need to add on
 * @param handler - Callback method.
 */
function removeEvent(element: AnyObject, type: string, handler: AnyFunction): void {
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
