import type { AnyFunction } from './types'
/**
 * Returns true if the provided predicate function returns true for at least one element of a set, otherwise it returns false.
 *
 * @example
 * ```js
 * any([0, 1, 2, 0], x => x >= 2)
 * // true
 * ```
 * @since 1.0.9
 * @param arr - the target array
 * @param fn - the judgment method
 * @returns - the result of the judgment
 */
const any = <T = unknown>(arr: T[], fn: AnyFunction) => arr.some(fn)

export default any
