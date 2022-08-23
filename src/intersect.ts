import contains from './contains'

/**
 * 求多个数组的交集
 *
 * @example
 * ```js
 * intersect([1, 2], [2, 3, 4], [2, 8], [2, '33']) // [2]
 * ```
 * @param args - 参数
 * @returns array
 */
function intersect<T = unknown>(...args: T[][]): T[] {
	return args.reduce((pre, cur) => pre.filter(item => contains(cur, item)))
}

export default intersect
