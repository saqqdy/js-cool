import type { AnyFunction } from './types'

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
 * @since 5.24.0
 * @param fn - The function to throttle
 * @param wait - The number of milliseconds to throttle
 * @param options - The options object
 * @returns - The throttled function
 */
function throttle<T extends AnyFunction>(
	fn: T,
	wait = 0,
	options: ThrottleOptions = {}
): T & { cancel: () => void; flush: () => void } {
	const { leading = true, trailing = true } = options

	let timer: ReturnType<typeof setTimeout> | null = null,
	 lastArgs: any[] | null = null,
	 lastThis: any = null,
	 lastCallTime = 0,
	 result: any

	function invokeFunc(): any {
		const args = lastArgs
		const thisArg = lastThis

		lastArgs = null
		lastThis = null

		if (args) {
			result = fn.apply(thisArg, args)
		}
		return result
	}

	function throttled(this: any, ...args: Parameters<T>): any {
		const time = Date.now()

		if (!lastCallTime && !leading) {
			lastCallTime = time
		}

		const remaining = wait - (time - lastCallTime)

		lastArgs = args
		// eslint-disable-next-line ts/no-this-alias
		lastThis = this

		if (remaining <= 0 || remaining > wait) {
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
			lastCallTime = time
			result = invokeFunc()
		} else if (!timer && trailing) {
			timer = setTimeout(() => {
				lastCallTime = leading ? Date.now() : 0
				timer = null
				if (trailing && lastArgs) {
					invokeFunc()
				}
			}, remaining)
		}

		return result
	}

	throttled.cancel = function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		lastCallTime = 0
		lastArgs = null
		lastThis = null
	}

	throttled.flush = function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
			return invokeFunc()
		}
		return result
	}

	return throttled as T & { cancel: () => void; flush: () => void }
}

export default throttle
