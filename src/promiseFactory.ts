/**
 * Convert an object to a promise-like API (thenable object)
 *
 * @example
 * ```js
 * import { promiseFactory, waiting } from 'js-cool'
 *
 * // Create a thenable object
 * function loadData() {
 *   const stats = { value: 100 }
 *
 *   const resolver = () =>
 *     new Promise(resolve =>
 *       waiting(2000).then(() => {
 *         stats.value = 200
 *         resolve(stats)
 *       })
 *     )
 *
 *   return promiseFactory(stats, resolver)
 * }
 *
 * // Synchronous access (returns initial value)
 * const result = loadData()
 * console.log(result.value) // 100
 *
 * // Asynchronous access (returns resolved value)
 * const asyncResult = await loadData()
 * console.log(asyncResult.value) // 200
 *
 * // Use with .then()
 * loadData().then(data => console.log(data.value))
 * ```
 * @since 5.10.0
 * @param original - original object to wrap
 * @param resolver - function that returns a Promise
 * @returns - thenable object that behaves like both the original object and a Promise
 */
function promiseFactory<T extends object>(
	original: T,
	resolver: () => Promise<any>
): T & PromiseLike<T> {
	return {
		...original,
		then<TResult1 = T, TResult2 = never>(
			onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
			onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
		): PromiseLike<TResult1 | TResult2> {
			return resolver().then(onFulfilled, onRejected)
		},
	}
}

export default promiseFactory
