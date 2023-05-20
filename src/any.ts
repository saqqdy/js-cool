import type { AnyFunction } from '../typings/common'
/**
 * Returns true if the provided predicate function returns true for at least one element of a set, otherwise it returns false.
 *
 * @example
 * ```js
 * any([0, 1, 2, 0], x => x >= 2); // true
 * ```
 * @example
 * ```js
 * any([0, 0, 1, 0]); // true
 * ```
 * @param arr - the target array
 * @param fn - the judgment method
 * @returns returns the result of the judgment
 */
const any = (arr: any[], fn: AnyFunction) => arr.some(fn)

export default any
