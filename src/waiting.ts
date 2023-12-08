/**
 * waiting for a while
 *
 * @since 5.5.0
 * @param milliseconds - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout
 */
const waiting = (milliseconds: number, throwOnTimeout = false): Promise<void> =>
	new Promise((resolve, reject) => setTimeout(throwOnTimeout ? reject : resolve, milliseconds))

export default waiting
