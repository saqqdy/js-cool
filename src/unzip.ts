/**
 * This method is like zip except that it accepts an array of grouped elements and
 * creates an array regrouping the elements to their pre-zip configuration.
 *
 * @example
 * ```js
 * unzip([['a', 1], ['b', 2]])
 * // [['a', 'b'], [1, 2]]
 *
 * unzip([['a', 1, true], ['b', 2, false]])
 * // [['a', 'b'], [1, 2], [true, false]]
 *
 * unzip([[1, 4], [2, 5], [3, 6]])
 * // [[1, 2, 3], [4, 5, 6]]
 * ```
 * @since 6.0.0
 * @param array - The array of grouped elements to process
 * @returns - The new array of regrouped elements
 */
function unzip<T extends unknown[][]>(array: T): unknown[][] {
  if (!Array.isArray(array) || array.length === 0) return []

  const maxLength = Math.max(...array.map(arr => (Array.isArray(arr) ? arr.length : 0)))
  const result: unknown[][] = []

  for (let i = 0; i < maxLength; i++) {
    result.push(array.map(arr => (Array.isArray(arr) ? arr[i] : undefined)))
  }

  return result
}

export default unzip
