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

/**
 * Debounce function
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
 * ```
 *
 * @since 5.24.0
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object
 * @returns - The debounced function
 */
function debounce<T extends AnyFunction>(
	fn: T,
	wait = 0,
	options: DebounceOptions = {}
): T & { cancel: () => void; flush: () => void; pending: () => boolean } {
	const { leading = false, maxWait, trailing = true } = options

	let timer: ReturnType<typeof setTimeout> | null = null,
		lastCallTime = 0,
		lastArgs: any[] | null = null,
		lastThis: any = null,
		result: any

	function invokeFunc(): any {
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

	function shouldCallLeading(time: number): boolean {
		return leading && lastCallTime !== time
	}

	function debounced(this: any, ...args: Parameters<T>): any {
		const time = Date.now()
		const isInvoking = shouldCallLeading(time) || (!timer && trailing)

		lastArgs = args
		// eslint-disable-next-line ts/no-this-alias
		lastThis = this

		if (isInvoking) {
			if (!timer) {
				lastCallTime = time
				if (leading) {
					invokeFunc()
				}
			}
		}

		if (timer) {
			clearTimeout(timer)
		}

		if (maxWait !== undefined) {
			const timeSinceLastCall = time - lastCallTime
			if (timeSinceLastCall >= maxWait) {
				invokeFunc()
				return result
			}
		}

		startTimer(() => {
			if (trailing) {
				invokeFunc()
			}
			timer = null
		}, wait)

		return result
	}

	debounced.cancel = function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		lastArgs = null
		lastThis = null
		lastCallTime = 0
	}

	debounced.flush = function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
			return invokeFunc()
		}
		return result
	}

	debounced.pending = function () {
		return timer !== null
	}

	return debounced as T & { cancel: () => void; flush: () => void; pending: () => boolean }
}

export default debounce
