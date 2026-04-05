import { describe, expect, it, vi } from 'vitest'
import retry, { RetryAbortError, RetryTimeoutError } from '../src/retry'

describe('retry', () => {
	it('should succeed on first try', async () => {
		const fn = vi.fn(() => Promise.resolve('success'))
		const result = await retry(fn)

		expect(result).toBe('success')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('should succeed with sync function', async () => {
		const fn = vi.fn(() => 'sync result')
		const result = await retry(fn)

		expect(result).toBe('sync result')
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

	it('should throw non-Error objects wrapped in Error', async () => {
		const fn = vi.fn().mockRejectedValueOnce('string error').mockResolvedValue('success')

		const result = await retry(fn, { times: 2 })
		expect(result).toBe('success')
	})

	it('should throw wrapped error after max retries', async () => {
		const fn = vi.fn().mockRejectedValue('string error')

		await expect(retry(fn, { times: 2 })).rejects.toThrow('string error')
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

	it('should not delay when delay is 0', async () => {
		const fn = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValue('success')

		const start = Date.now()
		await retry(fn, { delay: 0, times: 2 })
		const elapsed = Date.now() - start

		expect(elapsed).toBeLessThan(50)
	})

	describe('timeout', () => {
		it('should throw RetryTimeoutError when timeout is reached', async () => {
			const fn = vi.fn().mockImplementation(
				() => new Promise(resolve => setTimeout(resolve, 1000))
			)

			await expect(retry(fn, { times: 1, timeout: 50 })).rejects.toThrow(RetryTimeoutError)
		})

		it('should succeed before timeout', async () => {
			const fn = vi.fn().mockResolvedValue('success')

			const result = await retry(fn, { times: 1, timeout: 1000 })

			expect(result).toBe('success')
		})

		it('should include timeout value in error message', async () => {
			const fn = vi.fn().mockImplementation(
				() => new Promise(resolve => setTimeout(resolve, 1000))
			)

			await expect(retry(fn, { times: 1, timeout: 100 })).rejects.toThrow('100ms')
		})

		it('should retry after timeout', async () => {
			const fn = vi
				.fn()
				.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 200)))
				.mockResolvedValue('success')

			const result = await retry(fn, { times: 2, timeout: 50 })

			expect(result).toBe('success')
			expect(fn).toHaveBeenCalledTimes(2)
		})
	})

	describe('abort signal', () => {
		it('should throw RetryAbortError when signal is already aborted', async () => {
			const controller = new AbortController()
			controller.abort()

			const fn = vi.fn().mockResolvedValue('success')

			await expect(retry(fn, { times: 3, signal: controller.signal })).rejects.toThrow(
				RetryAbortError
			)
			expect(fn).toHaveBeenCalledTimes(0)
		})

		it('should throw RetryAbortError when aborted during execution', async () => {
			const controller = new AbortController()

			const fn = vi.fn().mockImplementation(() => {
				setTimeout(() => controller.abort(), 10)
				return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
			})

			await expect(retry(fn, { times: 3, signal: controller.signal })).rejects.toThrow(
				RetryAbortError
			)
		})

		it('should throw RetryAbortError when aborted between retries', async () => {
			const controller = new AbortController()

			const fn = vi.fn().mockImplementation(() => {
				if (fn.mock.calls.length === 1) {
					setTimeout(() => controller.abort(), 10)
				}
				return Promise.reject(new Error('fail'))
			})

			await expect(
				retry(fn, { times: 3, signal: controller.signal, delay: 100 })
			).rejects.toThrow(RetryAbortError)
		})

		it('should work with timeout and abort signal', async () => {
			const controller = new AbortController()

			const fn = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

			// Abort during timeout
			setTimeout(() => controller.abort(), 30)

			await expect(retry(fn, { times: 1, timeout: 100, signal: controller.signal })).rejects.toThrow()
		})
	})

	describe('RetryTimeoutError', () => {
		it('should have correct name', () => {
			const error = new RetryTimeoutError()
			expect(error.name).toBe('RetryTimeoutError')
		})

		it('should have default message', () => {
			const error = new RetryTimeoutError()
			expect(error.message).toBe('Operation timed out')
		})

		it('should accept custom message', () => {
			const error = new RetryTimeoutError('Custom timeout')
			expect(error.message).toBe('Custom timeout')
		})

		it('should be instance of Error', () => {
			const error = new RetryTimeoutError()
			expect(error).toBeInstanceOf(Error)
		})
	})

	describe('RetryAbortError', () => {
		it('should have correct name', () => {
			const error = new RetryAbortError()
			expect(error.name).toBe('RetryAbortError')
		})

		it('should have default message', () => {
			const error = new RetryAbortError()
			expect(error.message).toBe('Operation was aborted')
		})

		it('should accept custom message', () => {
			const error = new RetryAbortError('Custom abort')
			expect(error.message).toBe('Custom abort')
		})

		it('should be instance of Error', () => {
			const error = new RetryAbortError()
			expect(error).toBeInstanceOf(Error)
		})
	})

	describe('edge cases', () => {
		it('should work with times = 1', async () => {
			const fn = vi.fn().mockResolvedValue('success')

			const result = await retry(fn, { times: 1 })

			expect(result).toBe('success')
			expect(fn).toHaveBeenCalledTimes(1)
		})

		it('should throw immediately with times = 1 on failure', async () => {
			const fn = vi.fn().mockRejectedValue(new Error('fail'))

			await expect(retry(fn, { times: 1 })).rejects.toThrow('fail')
			expect(fn).toHaveBeenCalledTimes(1)
		})

		it('should work with default options', async () => {
			const fn = vi.fn().mockResolvedValue('success')

			const result = await retry(fn)

			expect(result).toBe('success')
		})

		it('should not call onRetry on success', async () => {
			const fn = vi.fn().mockResolvedValue('success')
			const onRetry = vi.fn()

			await retry(fn, { onRetry, times: 3 })

			expect(onRetry).not.toHaveBeenCalled()
		})
	})
})
