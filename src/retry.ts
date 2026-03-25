/**
 * Retry module - Retry async operations with configurable options
 *
 * @module retry
 * @since 6.0.0
 */

/**
 * Retry options
 */
export interface RetryOptions {
	/**
	 * Number of retry attempts (default: 3)
	 */
	times?: number
	/**
	 * Delay between retries in milliseconds (default: 0)
	 */
	delay?: number
	/**
	 * Timeout for each attempt in milliseconds
	 */
	timeout?: number
	/**
	 * Callback for each retry attempt
	 */
	onRetry?: (error: Error, attempt: number) => void
	/**
	 * Predicate to determine if retry should continue
	 * @returns true if should retry, false to stop
	 */
	shouldRetry?: (error: Error, attempt: number) => boolean
	/**
	 * AbortSignal to cancel the retry operation
	 */
	signal?: AbortSignal
}

/**
 * Error thrown when an operation times out
 */
export class RetryTimeoutError extends Error {
	constructor(message: string = 'Operation timed out') {
		super(message)
		this.name = 'RetryTimeoutError'
	}
}

/**
 * Error thrown when retry is aborted via AbortSignal
 */
export class RetryAbortError extends Error {
	constructor(message: string = 'Operation was aborted') {
		super(message)
		this.name = 'RetryAbortError'
	}
}

/**
 * Wrap a promise with timeout and abort signal support
 */
function withTimeout<T>(promise: Promise<T>, timeout: number, signal?: AbortSignal): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new RetryTimeoutError(`Operation timed out after ${timeout}ms`))
		}, timeout)

		const abortHandler = (): void => {
			clearTimeout(timeoutId)
			reject(new RetryAbortError())
		}

		if (signal) {
			if (signal.aborted) {
				clearTimeout(timeoutId)
				reject(new RetryAbortError())
				return
			}
			signal.addEventListener('abort', abortHandler, { once: true })
		}

		promise
			.then(resolve)
			.catch(reject)
			.finally(() => {
				clearTimeout(timeoutId)
				if (signal) {
					signal.removeEventListener('abort', abortHandler)
				}
			})
	})
}

/**
 * Retry a function until it succeeds or reaches the retry limit
 *
 * @example
 * ```ts
 * // Basic usage
 * const data = await retry(() => fetchData())
 *
 * // With options
 * const data = await retry(() => fetchData(), {
 *   times: 3,
 *   delay: 1000, // 1 second between retries
 * })
 *
 * // With conditional retry
 * const data = await retry(() => fetchData(), {
 *   times: 5,
 *   shouldRetry: (error) => error.message.includes('network'),
 * })
 *
 * // With retry callback
 * const data = await retry(() => fetchData(), {
 *   times: 3,
 *   onRetry: (error, attempt) => console.log(`Attempt ${attempt} failed: ${error.message}`),
 * })
 *
 * // With timeout per attempt
 * const data = await retry(() => fetchData(), {
 *   times: 3,
 *   timeout: 5000, // 5 seconds per attempt
 * })
 *
 * // With cancellation
 * const controller = new AbortController()
 * const data = await retry(() => fetchData(), {
 *   times: 3,
 *   signal: controller.signal,
 * })
 * // Cancel: controller.abort()
 * ```
 *
 * @template T - Return type of the function
 * @param fn - Function to retry (sync or async)
 * @param options - Retry options
 * @returns Promise resolving to the function result
 * @throws RetryTimeoutError if timeout is reached
 * @throws RetryAbortError if aborted via signal
 * @throws The last error if all retries fail
 */
async function retry<T>(fn: () => T | Promise<T>, options: RetryOptions = {}): Promise<T> {
	const { times = 3, delay = 0, timeout, onRetry, shouldRetry, signal } = options

	let lastError: Error = new Error('Unknown error')

	for (let attempt = 1; attempt <= times; attempt++) {
		// Check if aborted before each attempt
		if (signal?.aborted) {
			throw new RetryAbortError()
		}

		try {
			const result = fn()
			const promise = result instanceof Promise ? result : Promise.resolve(result)

			// Apply timeout if specified
			const finalPromise = timeout ? withTimeout(promise, timeout, signal) : promise

			return await finalPromise
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error))

			// Check if aborted after error
			if (signal?.aborted) {
				throw new RetryAbortError()
			}

			// Check if we should continue retrying
			if (attempt < times) {
				// Check shouldRetry predicate
				if (shouldRetry && !shouldRetry(lastError, attempt)) {
					throw lastError
				}

				// Call onRetry callback
				onRetry?.(lastError, attempt)

				// Wait before next retry
				if (delay > 0) {
					await new Promise(resolve => setTimeout(resolve, delay))
				}
			}
		}
	}

	throw lastError
}

export default retry
