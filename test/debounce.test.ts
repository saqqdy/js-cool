import { describe, expect, it, vi } from 'vitest'
import debounce from '../src/debounce'

describe('debounce', () => {
	it('should debounce function calls', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 100)

		debouncedFn()
		debouncedFn()
		debouncedFn()

		expect(fn).not.toHaveBeenCalled()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('should call with leading option', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 100, { leading: true })

		debouncedFn()

		expect(fn).toHaveBeenCalledTimes(1)

		debouncedFn()
		debouncedFn()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(fn).toHaveBeenCalledTimes(2)
	})

	it('should cancel pending execution', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 100)

		debouncedFn()
		debouncedFn.cancel()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(fn).not.toHaveBeenCalled()
	})

	it('should flush immediately', async () => {
		const fn = vi.fn((x: number) => x * 2)
		const debouncedFn = debounce(fn, 100)

		debouncedFn(5)
		const result = debouncedFn.flush()

		expect(fn).toHaveBeenCalledTimes(1)
		expect(result).toBe(10)
	})

	it('should check pending status', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 100)

		expect(debouncedFn.pending()).toBeFalsy()

		debouncedFn()

		expect(debouncedFn.pending()).toBeTruthy()

		await new Promise(resolve => setTimeout(resolve, 150))

		expect(debouncedFn.pending()).toBeFalsy()
	})
})
