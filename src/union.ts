import contains from './contains'
import unique from './unique'

/**
 * 求多个数组的并集
 *
 * @example
 * ```js
 * union([1, 2], [2, '33']) // [1, 2, '33']
 * ```
 * @param args - 参数
 * @returns array
 */
function union<T = unknown>(...args: T[][]): T[] {
	return unique(
		args.reduce((pre, cur) =>
			pre.concat(cur.filter(item => !contains(pre, item)))
		)
	)
}

export default union
