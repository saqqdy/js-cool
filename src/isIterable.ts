/**
 * Determine if it is iterable
 *
 * @example
 * ```js
 * // Iterable objects
 * isIterable([])              // true
 * isIterable('string')        // true
 * isIterable(new Map())       // true
 * isIterable(new Set())       // true
 * isIterable(arguments)       // true
 *
 * // Not iterable
 * isIterable({})              // false
 * isIterable(null)            // false
 * isIterable(undefined)       // false
 * isIterable(123)             // false
 *
 * // Use with for...of
 * if (isIterable(obj)) {
 *   for (const item of obj) {
 *     console.log(item)
 *   }
 * }
 * ```
 * @since 5.7.0
 * @param target - any target
 * @returns - true if target is iterable
 */
function isIterable<T = any>(target: T | Iterable<T>): target is Iterable<T> {
	if (target === null || target === undefined) return false

	// return typeof (target as Iterable<T>)[Symbol.iterator] === 'function'
	return Symbol.iterator in (target as Iterable<T>)
}

export default isIterable
