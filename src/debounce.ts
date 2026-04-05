import type { AnyFunction } from './types'

export interface DebounceOptions {
	/**
	 * Whether to execute on the leading edge
	 */
	leading?: boolean
	/**
	 * Maximum waiting time
	 */
	maxWait?: number
	/**
	 * Whether to execute on the trailing edge
	 */
	trailing?: boolean
}

export interface DebouncedFunction<T extends AnyFunction> {
	(...args: Parameters<T>): ReturnType<T> | undefined
	cancel: () => void
	flush: () => ReturnType<T> | undefined
	pending: () => boolean
}

/**
 * Debounce function
 *
 * Debouncing ensures a function is called after a specified delay since the last invocation.
 * If maxWait is provided, it will also throttle to ensure the function is called at most
 * once within the maxWait period.
 *
 * @example
 * ```ts
 * // Basic usage
 * const debouncedFn = debounce(() => {
 *   console.log('Debounced!')
 * }, 300)
 *
 * // With options
 * const debouncedFn = debounce(fn, 300, { leading: true, trailing: true })
 *
 * // Cancel pending execution
 * debouncedFn.cancel()
 *
 * // Flush immediately
 * debouncedFn.flush()
 *
 * // Check if there's a pending execution
 * debouncedFn.pending()
 * ```
 *
 * @since 6.0.0
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object
 * @returns - The debounced function
 */
function debounce<T extends AnyFunction>(
	fn: T,
	wait = 0,
	options: DebounceOptions = {}
): DebouncedFunction<T> {
	const { leading = false, maxWait, trailing = true } = options

	let timer: ReturnType<typeof setTimeout> | null = null,
		lastCallTime = 0,
		lastArgs: Parameters<T> | null = null,
		lastThis: any = null,
		result: ReturnType<T> | undefined

	const maxing = maxWait !== undefined
	const maxWaitTime = maxing ? Math.max(maxWait, wait) : 0

	function invokeFunc(): ReturnType<T> | undefined {
		const args = lastArgs
		const thisArg = lastThis

		lastArgs = null
		lastThis = null
		lastCallTime = Date.now()

		if (args) {
			result = fn.apply(thisArg, args)
		}
		return result
	}

	function startTimer(pendingFunc: () => void, waitTime: number): void {
		if (timer) clearTimeout(timer)
		timer = setTimeout(pendingFunc, waitTime)
	}

	function remainingWait(time: number): number {
		const timeSinceLastCall = time - lastCallTime
		const remaining = wait - timeSinceLastCall
		return maxing ? Math.min(remaining, maxWaitTime - timeSinceLastCall) : remaining
	}

	function shouldInvoke(time: number): boolean {
		const timeSinceLastCall = time - lastCallTime

		// First call or system time went backwards
		if (timeSinceLastCall < 0 || timeSinceLastCall >= wait) {
			return true
		}
		// Max wait exceeded (throttle behavior)
		if (maxing && timeSinceLastCall >= maxWaitTime) {
			return true
		}
		return false
	}

	function timerExpired(): void {
		const time = Date.now()
		const isInvoking = shouldInvoke(time)

		if (isInvoking) {
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
			lastCallTime = time
			// Execute trailing edge
			if (trailing && lastArgs) {
				invokeFunc()
			}
		} else {
			// Restart timer for remaining wait
			startTimer(timerExpired, remainingWait(time))
		}
	}

	function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
		const time = Date.now()
		const isInvoking = shouldInvoke(time)

		lastArgs = args
		// eslint-disable-next-line ts/no-this-alias
		lastThis = this

		if (isInvoking) {
			if (!timer) {
				lastCallTime = time
				// Execute on leading edge
				if (leading) {
					return invokeFunc()
				}
			}
			// Handle maxWait (throttle behavior)
			if (maxing) {
				startTimer(timerExpired, remainingWait(time))
				return invokeFunc()
			}
		}

		if (!timer) {
			startTimer(timerExpired, remainingWait(time))
		}

		return result
	}

	debounced.cancel = function (): void {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		lastArgs = null
		lastThis = null
		lastCallTime = 0
	}

	debounced.flush = function (): ReturnType<T> | undefined {
		if (timer) {
			clearTimeout(timer)
			timer = null
			return invokeFunc()
		}
		return result
	}

	debounced.pending = function (): boolean {
		return timer !== null
	}

	return debounced
}

export default debounce
