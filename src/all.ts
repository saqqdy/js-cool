import type { AnyFunction } from './types'

/**
 * Returns true if the provided predicate function returns true for all elements in a set, otherwise it returns false.
 *
 * @example
 * ```js
 * // All elements greater than 1
 * all([4, 2, 3], x => x > 1)
 * // true
 *
 * // Not all elements greater than 2
 * all([4, 2, 3], x => x > 2)
 * // false
 *
 * // All strings
 * all(['a', 'b', 'c'], x => typeof x === 'string')
 * // true
 *
 * // Empty array returns true
 * all([], x => x > 0)
 * // true
 * ```
 * @since 1.0.9
 * @param arr - the target array
 * @param fn - the judgment method
 * @returns - the result of the judgment
 */
const all = <T = unknown>(arr: T[], fn: AnyFunction): boolean => arr.every(fn)

export default all
