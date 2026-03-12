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
			onclick: existingHandler
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
