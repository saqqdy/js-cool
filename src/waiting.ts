/**
 * waiting for a while
 *
 * @example
 * ```js
 * // Basic usage
 * await waiting(1000)
 * console.log('Waited 1 second')
 *
 * // In async function
 * async function loadData() {
 *   await waiting(500)
 *   // Do something after 500ms
 * }
 *
 * // With throw on timeout
 * try {
 *   await waiting(5000, true)
 * } catch {
 *   console.log('Timeout!')
 * }
 *
 * // Use for polling
 * while (true) {
 *   await waiting(1000)
 *   checkStatus()
 * }
 * ```
 * @since 5.5.0
 * @param milliseconds - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout (default: false)
 * @returns - promise that resolves after the specified time
 */
const waiting = (milliseconds: number, throwOnTimeout = false): Promise<void> =>
	new Promise((resolve, reject) => setTimeout(throwOnTimeout ? reject : resolve, milliseconds))

export default waiting
