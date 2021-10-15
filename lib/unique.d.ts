/**
 * 数组去重
 *
 * @example
 * ```js
 * unique([1, 2, 2, '33']) // [1, 2, '33']
 * ```
 * @returns array
 */
declare function unique<T = unknown>(arr: T[]): T[];
export default unique;
