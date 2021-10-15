/**
 * 数组是否包含指定元素
 *
 * @example
 * ```js
 * contains([1, 2], 2) // true
 * contains([1, 2], 3) // false
 * ```
 * @param arr - 目标数组
 * @param item - 要查找的目标
 * @returns boolean
 */
export function contains(arr: any[], item: any): boolean {
    for (const el of arr) {
        if (el === item) return true
    }
    return false
}

export default contains
