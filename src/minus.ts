import contains from './contains'
import unique from './unique'

/**
 * Find the set of differences of multiple arrays that belong to A but not to B/C/D... of the elements of
 *
 * @example
 * ```js
 * // Basic usage
 * minus([1, 2], [2, '33'], [2, 4])
 * // [1]
 *
 * // With strings
 * minus(['a', 'b', 'c'], ['b'], ['c'])
 * // ['a']
 *
 * // Multiple arrays
 * minus([1, 2, 3, 4], [2, 3], [4])
 * // [1]
 *
 * // No difference
 * minus([1, 2], [1, 2])
 * // []
 * ```
 * @since 2.2.1
 * @param args - arguments
 * @returns - new array
 */
function minus<T = unknown>(...args: T[][]): T[] {
	return args.reduce((pre, cur, index) => {
		index === 1 && (pre = unique(pre))
		return pre.filter(item => !contains(cur, item))
	})
}

export default minus
