export interface PunctualTimerReturns {
	count: number
	timer: number | null
	clear: () => void
}

/**
 * punctual setInterval
 *
 * @example
 * ```js
 * const printDate = () => console.log(new Date())
 * const timer = punctualTimer(printDate, 1000)
 * console.log(timer.count) // 10
 * timer.clear() // clear punctualTimer or use clearTimeout(timer.timer)
 * ```
 * @since 5.18.0
 * @param handler - A function to be executed after the timer expires.
 * @param delay - The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by handler.
 */
function punctualTimer<TArgs extends any[]>(
	handler: (args: void) => void,
	delay: number,
	[...args]?: TArgs
): PunctualTimerReturns
function punctualTimer<TArgs extends any[]>(
	handler: (...args: TArgs) => void,
	delay: number,
	[...args]?: TArgs
): PunctualTimerReturns
function punctualTimer<TArgs extends any[]>(
	handler: any,
	delay: number,
	...args: TArgs
): PunctualTimerReturns {
	handler()
	let _this: PunctualTimerReturns = {
		count: 1,
		timer: null,
		clear() {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
			_this = null as any
			return _this
		}
	}
	const start = new Date().getTime()
	const instance = () => {
		handler()
		const ideal = _this.count * delay
		const real = new Date().getTime() - start
		_this.count++
		const diff = real - ideal
		_this.timer = setTimeout(instance, delay - diff, ...args) // Repair by system time
	}
	_this.timer = setTimeout(instance, delay, ...args)
	return _this
}

export default punctualTimer
