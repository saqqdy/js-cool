import { describe, expect, it, vi } from 'vitest'
import delay from '../src/delay'

describe('delay', () => {
	it('should return an object with register and destroy methods', () => {
		const d = delay()

		expect(typeof d.register).toBe('function')
		expect(typeof d.destroy).toBe('function')
		expect(typeof d.map).toBe('object')
	})

	it('should register and execute fn immediately in debounce mode', async () => {
		const d = delay()
		const fn = vi.fn()

		d.register('test', fn, 50, true)

		expect(fn).toHaveBeenCalled()

		// Wait for timeout to clear
		await new Promise(resolve => setTimeout(resolve, 60))
		expect(d.map.test).toBeUndefined()
	})

	it('should register and delay execute fn in throttle mode', async () => {
		const d = delay()
		const fn = vi.fn()

		d.register('test', fn, 50, false)

		expect(fn).not.toHaveBeenCalled()

		await new Promise(resolve => setTimeout(resolve, 60))

		expect(fn).toHaveBeenCalled()
	})

	it('should destroy registered timeout', async () => {
		const d = delay()
		const fn = vi.fn()

		d.register('test', fn, 50, false)
		d.destroy('test')

		await new Promise(resolve => setTimeout(resolve, 60))

		expect(fn).not.toHaveBeenCalled()
	})

	it('should handle destroying non-existent id', () => {
		const d = delay()

		expect(() => d.destroy('non-existent')).not.toThrow()
	})

	it('should re-register in throttle mode', async () => {
		const d = delay()
		const fn = vi.fn()

		d.register('test', fn, 50, false)
		d.register('test', fn, 50, false)

		await new Promise(resolve => setTimeout(resolve, 60))

		expect(fn).toHaveBeenCalledTimes(1)
	})
})
