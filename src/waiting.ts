/**
 * waiting for a while
 *
 * @param milliseconds - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout
 */
const waiting = (milliseconds: number, throwOnTimeout = false) =>
	new Promise((resolve, reject) => setTimeout(throwOnTimeout ? reject : resolve, milliseconds))

export default waiting
