import contains from './contains'
import unique from './unique'

/**
 * Find the concatenation of multiple arrays (union set)
 *
 * @example
 * ```js
 * // Basic usage
 * union([1, 2], [2, '33'])
 * // [1, 2, '33']
 *
 * // Multiple arrays
 * union([1, 2], [2, '33'], [1, 11, 2, '2'])
 * // [1, 2, '33', 11, '2']
 *
 * // With strings
 * union(['a', 'b'], ['b', 'c'], ['c', 'd'])
 * // ['a', 'b', 'c', 'd']
 *
 * // Single array
 * union([1, 2, 2, 3])
 * // [1, 2, 3]
 * ```
 * @since 2.2.1
 * @param args - arguments
 * @returns - new array with unique values
 */
function union<T = unknown>(...args: T[][]): T[] {
	return unique(args.reduce((pre, cur) => pre.concat(cur.filter(item => !contains(pre, item)))))
}

export default union
