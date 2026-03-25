/**
 * Array utilities collection
 *
 * @example
 * ```ts
 * import { unique, chunk, shuffle, groupBy } from 'js-cool/array'
 *
 * // Remove duplicates
 * unique([1, 2, 2, 3]) // [1, 2, 3]
 *
 * // Chunk array
 * chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 *
 * // Shuffle array
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 *
 * // Group by key
 * groupBy([{ type: 'a' }, { type: 'b' }], 'type')
 * // { a: [{ type: 'a' }], b: [{ type: 'b' }] }
 * ```
 *
 * @module array
 * @since 6.0.0
 */

export { default as all } from '../all'
export { default as any } from '../any'
export { default as chunk } from '../chunk'
export { default as complement } from '../complement'
export { default as contains } from '../contains'
export { flatten, flattenDeep } from '../flatten'
export { default as groupBy } from '../groupBy'
export { default as intersect } from '../intersect'
export { default as keyBy } from '../keyBy'
export { default as minus } from '../minus'
export { default as sample } from '../sample'
export { default as sampleSize } from '../sampleSize'
export { default as shuffle } from '../shuffle'
export { default as sorter } from '../sorter'
export { default as sortPinyin } from '../sortPinyin'
export { default as union } from '../union'
export { default as unique } from '../unique'
