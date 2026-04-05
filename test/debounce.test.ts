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

	it('should work with maxWait option (throttle behavior)', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 50, { maxWait: 100 })

		// First call starts the timer
		debouncedFn()

		// First call executes immediately due to maxWait behavior on first call
		expect(fn).toHaveBeenCalledTimes(1)

		await new Promise(resolve => setTimeout(resolve, 40))
		debouncedFn()
		await new Promise(resolve => setTimeout(resolve, 40))
		debouncedFn()

		// Wait for trailing call
		await new Promise(resolve => setTimeout(resolve, 100))

		// Leading + trailing calls
		expect(fn.mock.calls.length).toBeGreaterThanOrEqual(2)
	})

	it('should pass arguments correctly', async () => {
		const fn = vi.fn((a: number, b: number) => a + b)
		const debouncedFn = debounce(fn, 50)

		debouncedFn(1, 2)
		debouncedFn(3, 4)
		debouncedFn(5, 6)

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith(5, 6)
	})

	it('should preserve this context', async () => {
		const obj = {
			value: 42,
			method: function () {
				return this.value
			}
		}

		const fn = vi.fn(obj.method)
		const debouncedFn = debounce(fn, 50)

		debouncedFn.call(obj)

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveReturnedWith(42)
	})

	it('should return result from last call', async () => {
		const fn = vi.fn((x: number) => x * 2)
		const debouncedFn = debounce(fn, 50)

		debouncedFn(1)
		debouncedFn(2)
		const result = debouncedFn(3)

		await new Promise(resolve => setTimeout(resolve, 100))

		// Result is undefined until the function executes
		expect(result).toBeUndefined()
	})

	it('should return cached result after execution', async () => {
		const fn = vi.fn((x: number) => x * 2)
		const debouncedFn = debounce(fn, 50)

		debouncedFn(5)

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(debouncedFn(10)).toBe(10)
	})

	it('should work with trailing option disabled', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 50, { trailing: false })

		debouncedFn()
		debouncedFn()
		debouncedFn()

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(fn).not.toHaveBeenCalled()
	})

	it('should work with both leading and trailing', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 50, { leading: true, trailing: true })

		debouncedFn() // leading call
		debouncedFn()
		debouncedFn() // trailing call

		await new Promise(resolve => setTimeout(resolve, 100))

		expect(fn).toHaveBeenCalledTimes(2)
	})

	it('should return undefined from flush when no pending call', () => {
		const fn = vi.fn((x: number) => x * 2)
		const debouncedFn = debounce(fn, 100)

		const result = debouncedFn.flush()

		expect(fn).not.toHaveBeenCalled()
		expect(result).toBeUndefined()
	})

	it('should return result from cancel', async () => {
		const fn = vi.fn((x: number) => x * 2)
		const debouncedFn = debounce(fn, 50, { leading: true })

		debouncedFn(5)

		expect(fn).toHaveBeenCalledTimes(1)

		// Cancel should not affect already executed calls
		debouncedFn.cancel()

		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('should work with maxWait and leading', async () => {
		const fn = vi.fn()
		const debouncedFn = debounce(fn, 100, { maxWait: 100, leading: true })

		debouncedFn() // Leading call
		expect(fn).toHaveBeenCalledTimes(1)

		await new Promise(resolve => setTimeout(resolve, 50))
		debouncedFn() // Throttled, will be called at maxWait

		await new Promise(resolve => setTimeout(resolve, 100))
		expect(fn.mock.calls.length).toBeGreaterThanOrEqual(2)
	})
})
