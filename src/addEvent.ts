/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AnyFunction, AnyObject } from './types'

/**
 * addEvent() event delegate, supports multiple delegates
 *
 * @param element - js dom object
 * @param type - The event type. No need to add on
 * @param handler - callback method
 */
function addEvent(element: AnyObject, type: string, handler: AnyFunction) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false)
	} else {
		// Assign a unique ID to each event handler
		if (!handler.$$guid) handler.$$guid = addEvent.guid++
		// Create a hash table for the event type of the element
		if (!element.events) element.events = {}
		// Create a hash table of event handlers for each "element/event" pair
		let handlers = element.events[type]
		if (!handlers) {
			handlers = element.events[type] = {}
			// Store the event handler functions that exist (if any)
			if (element['on' + type]) {
				handlers[0] = element['on' + type]
			}
		}
		// Store event handling functions in a hash table
		handlers[handler.$$guid] = handler
		// Assign a global event handler to do all the work
		element['on' + type] = handleEvent
	}
}
// a counter used to create unique IDs
addEvent.guid = 1

/**
 * handleEvent() to execute the event
 *
 * @private
 * @param event - event type
 * @returns returnValue
 */
function handleEvent(event: any): boolean {
	let returnValue = true
	// @ts-expect-error
	const that: any = this
	// Capturing event objects (IE uses global event objects)
	event =
		event ||
		fixEvent(((that.ownerDocument || that.document || that).parentWindow || window).event)
	// Get a reference to the hash table of the event handling function
	// @ts-expect-error
	const handlers = (this as any).events[event.type]
	// Execute each handler function
	for (const i in handlers) {
		// @ts-expect-error
		;(this as any).$$handleEvent = handlers[i]
		// @ts-expect-error
		if ((this as any).$$handleEvent(event) === false) {
			returnValue = false
		}
	}
	return returnValue
}

/**
 * Add some "missing" functions to IE's event objects
 *
 * @private
 * @param event - event type
 * @returns event returns the event that completes the missing method
 */
function fixEvent(event: any): any {
	// Adding standard W3C methods
	event.preventDefault = fixEvent.preventDefault
	event.stopPropagation = fixEvent.stopPropagation
	return event
}
fixEvent.preventDefault = function () {
	;(this as any).returnValue = false
}
fixEvent.stopPropagation = function () {
	;(this as any).cancelBubble = true
}

export default addEvent
