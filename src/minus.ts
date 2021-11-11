import contains from './contains'
import unique from './unique'

/**
 * 求多个数组的差集，属于A但不属于B/C/D...的元素
 *
 * @example
 * ```js
 * minus([1, 2], [2, '33'], [2, 4]) // [1]
 * ```
 * @param args - 参数
 * @returns array
 */
function minus<T = unknown>(...args: T[][]): T[] {
    return args.reduce((pre, cur, index) => {
        index === 1 && (pre = unique(pre))
        return pre.filter(item => !contains(cur, item))
    })
}

export default minus
