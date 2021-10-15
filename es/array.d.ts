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
export declare function intersect<T = unknown>(...args: T[][]): T[];
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
export declare function union<T = unknown>(...args: T[][]): T[];
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
export declare function minus<T = unknown>(...args: T[][]): T[];
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
export declare function complement<T = unknown>(...args: T[][]): T[];
declare const _default: {
    intersect: typeof intersect;
    union: typeof union;
    minus: typeof minus;
    complement: typeof complement;
};
export default _default;
