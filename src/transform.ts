import { hasOwn } from './_compat'

/**
 * An alternative to reduce; this method transforms object to a new accumulator
 * object which is the result of running each of its own enumerable string keyed
 * properties thru iteratee, with each invocation potentially mutating the
 * accumulator object.
 *
 * The iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning false.
 *
 * @example
 * ```js
 * // Transform object to array of values
 * transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
 *   result.push({ key, value })
 *   return result
 * }, [])
 * // [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]
 *
 * // Filter and transform
 * transform({ a: 1, b: 2, c: 3, d: 4 }, (result, value, key) => {
 *   if (value % 2 === 0) {
 *     result[key] = value * 2
 *   }
 * }, {})
 * // { b: 4, d: 8 }
 *
 * // Early exit by returning false
 * transform({ a: 1, b: 2, c: 3 }, (result, value, key) => {
 *   result[key] = value
 *   if (key === 'b') return false
 * }, {})
 * // { a: 1, b: 2 }
 *
 * // Transform array to object
 * transform(['a', 'b', 'c'], (result, value, index) => {
 *   result[value] = index
 * }, {})
 * // { a: 0, b: 1, c: 2 }
 * ```
 *
 * @since 6.0.0
 * @param object - The object to transform
 * @param iteratee - The function invoked per iteration
 * @param accumulator - The initial accumulator value (default: \{\})
 * @returns - The accumulated value
 */
function transform<T extends Record<string, unknown> | unknown[], R>(
	object: T,
	iteratee: (
		accumulator: R,
		value: T extends (infer U)[] ? U : T[keyof T],
		key: T extends unknown[] ? number : keyof T,
		object: T,
	) => R | boolean | void,
	accumulator?: R,
): R {
	// Handle null/undefined - return default accumulator
	if (object === null || object === undefined) {
		if (accumulator !== undefined) {
			return accumulator
		}
		return (Array.isArray(object) ? [] : {}) as R
	}

	// Initialize accumulator
	let result: R = accumulator as R
	if (result === undefined) {
		result = (Array.isArray(object) ? [] : {}) as R
	}

	// Handle arrays
	if (Array.isArray(object)) {
		for (let index = 0; index < object.length; index++) {
			const value = object[index]
			const returned = iteratee(
				result,
				value as T extends (infer U)[] ? U : T[keyof T],
				index as T extends unknown[] ? number : keyof T,
				object,
			)
			// Early exit if iteratee returns false
			if (returned === false) {
				break
			}
			// If iteratee returns a value, use it as the new accumulator
			if (returned !== undefined && returned !== true) {
				result = returned as R
			}
		}
		return result
	}

	// Handle objects
	if (typeof object === 'object') {
		for (const key in object) {
			if (hasOwn(object, key)) {
				const value = (object as Record<string, unknown>)[key]
				const returned = iteratee(
					result,
					value as T extends (infer U)[] ? U : T[keyof T],
					key as unknown as T extends unknown[] ? number : keyof T,
					object,
				)
				// Early exit if iteratee returns false
				if (returned === false) {
					break
				}
				// If iteratee returns a value, use it as the new accumulator
				if (returned !== undefined && returned !== true) {
					result = returned as R
				}
			}
		}
	}

	return result
}

export default transform
