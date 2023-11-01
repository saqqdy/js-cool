/**
 * Convert an object to a promise like api
 *
 * @example
 * ```js
 * import { promiseFactory, waiting } from 'js-cool'
 *
 * function promise() {
 *   const stats = {
 *    value: 100
 *   }
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
 * const res = promise() // res => 100
 * const res = await promise() // res => 200
 * ```
 * @since 5.10.0
 * @param original - original object
 * @param resolver - resolver function
 * @returns - result
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
		}
	}
}

export default promiseFactory
