import type { AnyFunction } from './types'
/**
 * Returns true if the provided predicate function returns true for at least one element of a set, otherwise it returns false.
 *
 * @example
 * ```js
 * // At least one element >= 2
 * any([0, 1, 2, 0], x => x >= 2)
 * // true
 *
 * // No element >= 10
 * any([0, 1, 2, 0], x => x >= 10)
 * // false
 *
 * // Check for existence of value
 * any(['a', 'b', 'c'], x => x === 'b')
 * // true
 *
 * // Empty array returns false
 * any([], x => x > 0)
 * // false
 * ```
 * @since 1.0.9
 * @param arr - the target array
 * @param fn - the judgment method
 * @returns - the result of the judgment
 */
const any = <T = unknown>(arr: T[], fn: AnyFunction) => arr.some(fn)

export default any
