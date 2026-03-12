/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import stopBubble from '../src/stopBubble'

describe('stopBubble', () => {
	it('should call stopPropagation on event', () => {
		const event = {
			stopPropagation: vi.fn()
		} as any

		const result = stopBubble(event)

		expect(event.stopPropagation).toHaveBeenCalled()
		expect(result).toBe(false)
	})

	it('should handle event without stopPropagation', () => {
		const event = {
			cancelBubble: false
		} as any

		const result = stopBubble(event)

		expect(event.cancelBubble).toBe(true)
		expect(result).toBe(false)
	})

	it('should handle null or undefined event', () => {
		// stopBubble doesn't handle null gracefully - it throws
		expect(() => stopBubble(null as any)).toThrow()
	})
})
