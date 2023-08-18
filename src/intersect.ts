import contains from './contains'

/**
 * Find the intersection of multiple arrays
 *
 * @example
 * ```js
 * intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
 * ```
 * @param args - arguments
 * @returns - new array
 */
function intersect<T = unknown>(...args: T[][]): T[] {
	return args.reduce((pre, cur) => pre.filter(item => contains(cur, item)))
}

export default intersect
