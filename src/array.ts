import contains from './contains'
import unique from './unique'

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
export function intersect<T = unknown>(...args: T[][]): T[] {
    return args.reduce((pre, cur) => pre.filter(item => contains(cur, item)))
}

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
export function union<T = unknown>(...args: T[][]): T[] {
    return unique(args.reduce((pre, cur) => pre.concat(cur.filter(item => !contains(pre, item)))))
}

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
export function minus<T = unknown>(...args: T[][]): T[] {
    return args.reduce((pre, cur, index) => {
        index === 1 && (pre = unique(pre))
        return pre.filter(item => !contains(cur, item))
    })
}

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
export function complement<T = unknown>(...args: T[][]): T[] {
    const intersectArray = intersect(...args) // 交集
    const unionArray = union(...args) // 补集
    return unionArray.filter(item => !contains(intersectArray, item))
}

export default {
    intersect,
    union,
    minus,
    complement
}
