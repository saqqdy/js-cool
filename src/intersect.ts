import contains from './contains'

/**
 * Whether the array contains the specified element
 *
 * @example
 * ```js
 * // Basic usage
 * contains([1, 2], 2) // true
 * contains([1, 2], 3) // false
 *
 * // With strings
 * contains(['a', 'b', 'c'], 'b') // true
 *
 * // With objects (reference comparison)
 * const obj = { a: 1 }
 * contains([obj, { b: 2 }], obj) // true
 * contains([obj, { b: 2 }], { a: 1 }) // false
 *
 * // Empty array
 * contains([], 1) // false
 * ```
 * @since 2.2.1
 * @param args - arrays to intersect
 * @returns boolean
 */
function intersect<T = unknown>(...args: T[][]): T[] {
	return args.reduce((pre, cur) => pre.filter(item => contains(cur, item)))
}

export default intersect
