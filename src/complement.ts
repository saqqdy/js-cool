import contains from './contains'
import intersect from './intersect'
import union from './union'

/**
 * 求多个数组的补集
 *
 * @example
 * ```js
 * complement([1, 2], [2, '33'], [2]) // [1, '33']
 * ```
 * @param args - 参数
 * @returns array
 */
function complement<T = unknown>(...args: T[][]): T[] {
	const intersectArray = intersect(...args) // 交集
	const unionArray = union(...args) // 补集
	return unionArray.filter(item => !contains(intersectArray, item))
}

export default complement
