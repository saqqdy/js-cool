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
export default intersect;
