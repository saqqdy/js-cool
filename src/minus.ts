import contains from './contains'
import unique from './unique'

/**
 * Find the set of differences of multiple arrays that belong to A but not to B/C/D... of the elements of
 *
 * @example
 * ```js
 * minus([1, 2], [2, '33'], [2, 4]) // [1]
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
