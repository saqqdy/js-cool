import { describe, expect, it, vi } from 'vitest'
import throttle from '../src/throttle'

describe('throttle', () => {
	it('should throttle function calls', async () => {
		const fn = vi.fn()
		const throttledFn = throttle(fn, 100)

		throttledFn()
		throttledFn()
		throttledFn()

		expect(fn).toHaveBeenCalledTimes(1)

		await new Promise(resolve => setTimeout(resolve, 150))

		throttledFn()

		expect(fn).toHaveBeenCalledTimes(2)
	})

	it('should cancel pending execution', async () => {
		const fn = vi.fn()
		const throttledFn = throttle(fn, 100, { leading: false })

		throttledFn()
		throttledFn.cancel()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(fn).not.toHaveBeenCalled()
	})

	it('should flush immediately', async () => {
		const fn = vi.fn((x: number) => x * 2)
		const throttledFn = throttle(fn, 100)

		throttledFn(5)

		await new Promise(resolve => setTimeout(resolve, 50))

		throttledFn(10)
		const result = throttledFn.flush()

		expect(fn).toHaveBeenCalledTimes(2)
		expect(result).toBe(20)
	})

	it('should work with trailing option', async () => {
		const fn = vi.fn()
		const throttledFn = throttle(fn, 100, { leading: false, trailing: true })

		throttledFn()
		throttledFn()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(fn).toHaveBeenCalledTimes(1)
	})
})
