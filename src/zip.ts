/**
 * Creates an array of grouped elements, the first of which contains the first elements
 * of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 *
 * @example
 * ```js
 * zip(['a', 'b', 'c'], [1, 2, 3])
 * // [['a', 1], ['b', 2], ['c', 3]]
 *
 * zip(['a', 'b'], [1, 2], [true, false])
 * // [['a', 1, true], ['b', 2, false]]
 *
 * zip([1, 2], [3, 4, 5])
 * // [[1, 3], [2, 4]]
 *
 * zip(['a'], [1], [true])
 * // [['a', 1, true]]
 * ```
 * @since 6.0.0
 * @param arrays - The arrays to process
 * @returns - The new array of grouped elements
 */
function zip<T extends unknown[][]>(...arrays: T): unknown[][] {
  if (!arrays.length) return []
  if (arrays.length === 1) return arrays[0].map(item => [item])

  const maxLength = Math.min(...arrays.map(arr => arr.length))
  const result: unknown[][] = []

  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map(arr => arr[i]))
  }

  return result
}

export default zip
