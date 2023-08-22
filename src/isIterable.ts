/**
 * Determine if it is iterable
 *
 * @example
 * ```js
 * isIterable([]) // true
 * ```
 * @param target - any target
 * @returns - target is Array
 */
function isIterable<T = any>(target: T | Iterable<T>): target is Iterable<T> {
	if (target === null || target === undefined) return false
	// return typeof (target as Iterable<T>)[Symbol.iterator] === 'function'
	return Symbol.iterator in (target as Iterable<T>)
}

export default isIterable
