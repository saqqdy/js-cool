import type { AnyFunction } from '../typings/common'

/**
 * Returns true if the provided predicate function returns true for all elements in a set, otherwise it returns false.
 *
 * @example
 * ```js
 * all([4, 2, 3], x => x > 1)
 * // true
 * ```
 * @param arr - the target array
 * @param fn - the judgment method
 * @returns - the result of the judgment
 */
const all = <T = unknown>(arr: T[], fn: AnyFunction) => arr.every(fn)

export default all
