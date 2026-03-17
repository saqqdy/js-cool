export interface RetryOptions {
	/**
	 * The delay between retries in milliseconds (default: 0)
	 */
	delay?: number
	/**
	 * Callback for each retry attempt
	 */
	onRetry?: (error: Error, attempt: number) => void
	/**
	 * A function that returns true if the error should trigger a retry
	 */
	shouldRetry?: (error: Error, attempt: number) => boolean
	/**
	 * The number of times to retry (default: 3)
	 */
	times?: number
}

/**
 * Retry a function until it succeeds or the retry limit is reached.
 *
 * @example
 * ```ts
 * // Basic usage
 * const result = await retry(() => fetchData(), { times: 3, delay: 1000 })
 *
 * // With shouldRetry
 * const result = await retry(() => fetchData(), {
 *   times: 5,
 *   shouldRetry: (error) => error.message.includes('network')
 * })
 *
 * // With onRetry callback
 * const result = await retry(() => fetchData(), {
 *   times: 3,
 *   onRetry: (error, attempt) => console.log(`Retry ${attempt}: ${error.message}`)
 * })
 * ```
 *
 * @since 5.24.0
 * @param fn - The function to retry
 * @param options - The retry options
 * @returns - Returns a promise that resolves with the result
 */
async function retry<T>(fn: () => T | Promise<T>, options: RetryOptions = {}): Promise<T> {
	const { delay = 0, onRetry, shouldRetry, times = 3 } = options

	let lastError: Error = new Error('Unknown error')

	for (let attempt = 1; attempt <= times; attempt++) {
		try {
			return await fn()
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error))

			// Check if we should retry
			if (attempt < times) {
				if (shouldRetry && !shouldRetry(lastError, attempt)) {
					throw lastError
				}

				// Call onRetry callback
				if (onRetry) {
					onRetry(lastError, attempt)
				}

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
