import { describe, expect, it, vi } from 'vitest'
import retry from '../src/retry'

describe('retry', () => {
	it('should succeed on first try', async () => {
		const fn = vi.fn(() => Promise.resolve('success'))
		const result = await retry(fn)

		expect(result).toBe('success')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('should retry on failure', async () => {
		const fn = vi
			.fn()
			.mockRejectedValueOnce(new Error('fail 1'))
			.mockRejectedValueOnce(new Error('fail 2'))
			.mockResolvedValue('success')

		const result = await retry(fn, { times: 3 })

		expect(result).toBe('success')
		expect(fn).toHaveBeenCalledTimes(3)
	})

	it('should throw after max retries', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('always fails'))

		await expect(retry(fn, { times: 3 })).rejects.toThrow('always fails')
		expect(fn).toHaveBeenCalledTimes(3)
	})

	it('should use shouldRetry callback', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('network error'))

		await expect(
			retry(fn, {
				shouldRetry: error => error.message.includes('network'),
				times: 3,
			})
		).rejects.toThrow('network error')
		expect(fn).toHaveBeenCalledTimes(3)
	})

	it('should stop retrying when shouldRetry returns false', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('fatal error'))

		await expect(
			retry(fn, {
				shouldRetry: error => !error.message.includes('fatal'),
				times: 3,
			})
		).rejects.toThrow('fatal error')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('should call onRetry callback', async () => {
		const fn = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValue('success')

		const onRetry = vi.fn()

		await retry(fn, { onRetry, times: 2 })

		expect(onRetry).toHaveBeenCalledTimes(1)
		expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1)
	})

	it('should delay between retries', async () => {
		const fn = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValue('success')

		const start = Date.now()
		await retry(fn, { delay: 100, times: 2 })
		const elapsed = Date.now() - start

		expect(elapsed).toBeGreaterThanOrEqual(90)
	})
})
