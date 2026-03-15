/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import addEvent from '../src/addEvent'
import removeEvent from '../src/removeEvent'

describe('removeEvent', () => {
	it('should remove event listener with removeEventListener', () => {
		const element = document.createElement('div')
		const handler = vi.fn()

		addEvent(element, 'click', handler)
		removeEvent(element, 'click', handler)
		element.click()

		expect(handler).not.toHaveBeenCalled()
	})

	it('should handle removing non-existent event', () => {
		const element = document.createElement('div')
		const handler = vi.fn()

		// Should not throw
		expect(() => removeEvent(element, 'click', handler)).not.toThrow()
	})

	it('should remove event from events hash in legacy mode', () => {
		const handler = vi.fn()

		;(handler as any).$$guid = 1
		const element = {
			events: {
				click: {
					1: handler,
				},
			},
		} as any

		// Remove addEventListener to trigger legacy path
		delete element.removeEventListener
		removeEvent(element, 'click', handler)

		expect(element.events.click[1]).toBeUndefined()
	})

	it('should handle missing events object in legacy mode', () => {
		const handler = vi.fn()
		const element = {} as any

		delete element.removeEventListener
		expect(() => removeEvent(element, 'click', handler)).not.toThrow()
	})
})
