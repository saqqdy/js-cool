/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import addEvent from '../src/addEvent'

describe('addEvent', () => {
	it('should add event listener with addEventListener', () => {
		const element = document.createElement('div')
		const handler = vi.fn()

		addEvent(element, 'click', handler)
		element.click()

		expect(handler).toHaveBeenCalled()
	})

	it('should assign guid to handler (in legacy mode)', () => {
		// Create element without addEventListener to trigger legacy mode
		const element = { events: {} } as any
		const handler = vi.fn()

		// Mock the legacy path by removing addEventListener
		delete element.addEventListener
		addEvent(element, 'click', handler)

		expect((handler as any).$$guid).toBeDefined()
	})

	it('should work with multiple events', () => {
		const element = document.createElement('div')
		const handler1 = vi.fn()
		const handler2 = vi.fn()

		addEvent(element, 'click', handler1)
		addEvent(element, 'click', handler2)
		element.click()

		expect(handler1).toHaveBeenCalled()
		expect(handler2).toHaveBeenCalled()
	})

	it('should store existing on-type handler in legacy mode', () => {
		const existingHandler = vi.fn()
		const element = {
			events: {},
			onclick: existingHandler,
		} as any

		delete element.addEventListener
		const handler = vi.fn()

		addEvent(element, 'click', handler)

		expect(element.events.click[0]).toBe(existingHandler)
	})

	it('should handle events type initialization', () => {
		const element = {} as any

		delete element.addEventListener
		delete element.events

		const handler = vi.fn()

		addEvent(element, 'click', handler)

		expect(element.events).toBeDefined()
		expect(element.events.click).toBeDefined()
	})
})

describe('addEvent legacy mode - handleEvent', () => {
	it('should call handleEvent when event is triggered in legacy mode', () => {
		const element = {
			events: {},
		} as any
		delete element.addEventListener

		const handler = vi.fn()
		addEvent(element, 'click', handler)

		// Trigger the onclick handler (which is handleEvent)
		const event = { type: 'click' }
		element.onclick(event)

		expect(handler).toHaveBeenCalledWith(event)
	})

	it('should return true when handler does not return false', () => {
		const element = {
			events: {},
		} as any
		delete element.addEventListener

		const handler = vi.fn()
		addEvent(element, 'click', handler)

		const event = { type: 'click' }
		const result = element.onclick(event)

		expect(result).toBeTruthy()
	})

	it('should return false when handler returns false', () => {
		const element = {
			events: {},
		} as any
		delete element.addEventListener

		const handler = vi.fn().mockReturnValue(false)
		addEvent(element, 'click', handler)

		const event = { type: 'click' }
		const result = element.onclick(event)

		expect(result).toBeFalsy()
	})

	it('should call multiple handlers in legacy mode', () => {
		const element = {
			events: {},
		} as any
		delete element.addEventListener

		const handler1 = vi.fn()
		const handler2 = vi.fn()
		addEvent(element, 'click', handler1)
		addEvent(element, 'click', handler2)

		const event = { type: 'click' }
		element.onclick(event)

		expect(handler1).toHaveBeenCalled()
		expect(handler2).toHaveBeenCalled()
	})

	it('should use window.event when event is undefined', () => {
		const element = {
			events: {},
			ownerDocument: {
				parentWindow: {
					event: { type: 'click', testProp: 'fromWindow' },
				},
			},
		} as any
		delete element.addEventListener

		const handler = vi.fn()
		addEvent(element, 'click', handler)

		// Call without event argument (IE style)
		element.onclick()

		expect(handler).toHaveBeenCalled()
	})

	it('should use document.parentWindow when ownerDocument is not available', () => {
		const element = {
			events: {},
			document: {
				parentWindow: {
					event: { type: 'click' },
				},
			},
		} as any
		delete element.addEventListener

		const handler = vi.fn()
		addEvent(element, 'click', handler)

		element.onclick()

		expect(handler).toHaveBeenCalled()
	})
})

describe('addEvent legacy mode - fixEvent', () => {
	it('should add preventDefault method to event when no event passed', () => {
		const element = {
			events: {},
			ownerDocument: {
				parentWindow: {
					event: { type: 'click' },
				},
			},
		} as any
		delete element.addEventListener

		let capturedEvent: any
		const handler = vi.fn((event: any) => {
			capturedEvent = event
			event.preventDefault()
		})
		addEvent(element, 'click', handler)

		// Call without event argument to trigger fixEvent
		element.onclick()

		expect(handler).toHaveBeenCalled()
		expect(capturedEvent.preventDefault).toBeDefined()
		expect(capturedEvent.returnValue).toBeFalsy()
	})

	it('should add stopPropagation method to event when no event passed', () => {
		const element = {
			events: {},
			ownerDocument: {
				parentWindow: {
					event: { type: 'click' },
				},
			},
		} as any
		delete element.addEventListener

		let capturedEvent: any
		const handler = vi.fn((event: any) => {
			capturedEvent = event
			event.stopPropagation()
		})
		addEvent(element, 'click', handler)

		// Call without event argument to trigger fixEvent
		element.onclick()

		expect(handler).toHaveBeenCalled()
		expect(capturedEvent.stopPropagation).toBeDefined()
		expect(capturedEvent.cancelBubble).toBeTruthy()
	})
})
