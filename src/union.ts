import contains from './contains'
import unique from './unique'

/**
 * Find the concatenation of multiple arrays
 *
 * @example
 * ```js
 * union([1, 2], [2, '33'])
 * // [1, 2, '33']
 *
 * union([1, 2], [2, '33'], [1, 11, 2, '2'])
 * // [ 1, 2, '33', 11, '2' ]
 * ```
 * @param args - arguments
 * @returns - new array
 */
function union<T = unknown>(...args: T[][]): T[] {
	return unique(args.reduce((pre, cur) => pre.concat(cur.filter(item => !contains(pre, item)))))
}

export default union
