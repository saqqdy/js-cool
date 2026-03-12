import { describe, expect, it, vi } from 'vitest'
import punctualTimer from '../src/punctualTimer'

describe('punctualTimer', () => {
	it('should execute handler immediately', () => {
		const handler = vi.fn()
		punctualTimer(handler, 100)

		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('should return timer object', () => {
		const handler = vi.fn()
		const timer = punctualTimer(handler, 100)

		expect(timer.count).toBe(1)
		expect(timer.timer).toBeDefined()
		expect(typeof timer.clear).toBe('function')
	})

	it('should clear timer', async () => {
		const handler = vi.fn()
		const timer = punctualTimer(handler, 50)

		timer.clear()

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(handler).toHaveBeenCalledTimes(1) // Only initial call
	})

	it('should execute on interval', async () => {
		const handler = vi.fn()
		punctualTimer(handler, 30)

		await new Promise(resolve => setTimeout(resolve, 40))

		expect(handler).toHaveBeenCalledTimes(2)
	})

	it('should increment count', async () => {
		const handler = vi.fn()
		const timer = punctualTimer(handler, 30)

		await new Promise(resolve => setTimeout(resolve, 40))

		expect(timer.count).toBe(2)
	})
})
