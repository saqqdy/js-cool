/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import stopDefault from '../src/stopDefault'

describe('stopDefault', () => {
	it('should call preventDefault on event', () => {
		const event = {
			preventDefault: vi.fn(),
		} as any

		const result = stopDefault(event)

		expect(event.preventDefault).toHaveBeenCalled()
		expect(result).toBeFalsy()
	})

	it('should handle event without preventDefault', () => {
		// Mock window.event
		;(window as any).event = { returnValue: true }

		const result = stopDefault({} as any)

		expect(result).toBeFalsy()
	})

	it('should handle null event', () => {
		;(window as any).event = { returnValue: true }

		const result = stopDefault(null as any)

		expect(result).toBeFalsy()
	})
})
