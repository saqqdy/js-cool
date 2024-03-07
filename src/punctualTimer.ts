/**
 * punctual setInterval
 *
 * @example
 * ```js
 * const printDate = () => console.log(new Date())
 * punctualTimer(printDate, 1000)
 * ```
 * @since 5.18.0
 * @param handler - A function to be executed after the timer expires.
 * @param delay - The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by handler.
 */
function punctualTimer<T extends Function>(handler: T, delay: number, ...args: any[]) {
	handler()
	let counter = 1
	const start = new Date().getTime()
	const instance = () => {
		handler()
		const ideal = counter * delay
		const real = new Date().getTime() - start
		counter++
		const diff = real - ideal
		setTimeout(instance, delay - diff, ...args) // Repair by system time
	}
	setTimeout(instance, delay, ...args)
}

export default punctualTimer
