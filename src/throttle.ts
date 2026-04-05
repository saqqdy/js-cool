import type { AnyFunction } from './types'
import debounce, { type DebouncedFunction } from './debounce'

export interface ThrottleOptions {
	/**
	 * Whether to execute on the leading edge
	 */
	leading?: boolean
	/**
	 * Whether to execute on the trailing edge
	 */
	trailing?: boolean
}

/**
 * Throttle function
 *
 * Throttling ensures a function is called at most once in a specified time period.
 * It's implemented using debounce with maxWait equal to wait time.
 *
 * @example
 * ```ts
 * // Basic usage
 * const throttledFn = throttle(() => {
 *   console.log('Throttled!')
 * }, 300)
 *
 * // With options
 * const throttledFn = throttle(fn, 300, { leading: true, trailing: true })
 *
 * // Cancel pending execution
 * throttledFn.cancel()
 *
 * // Flush immediately
 * throttledFn.flush()
 * ```
 *
 * @since 6.0.0
 * @param fn - The function to throttle
 * @param wait - The number of milliseconds to throttle
 * @param options - The options object
 * @returns - The throttled function
 */
function throttle<T extends AnyFunction>(
	fn: T,
	wait = 0,
	options: ThrottleOptions = {}
): DebouncedFunction<T> {
	const { leading = true, trailing = true } = options

	// Throttle is essentially debounce with maxWait equal to wait
	return debounce(fn, wait, {
		leading,
		trailing,
		maxWait: wait
	})
}

export default throttle
