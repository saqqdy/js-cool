/**
 * Creates a slice of array with n elements dropped from the beginning.
 *
 * @example
 * ```js
 * drop([1, 2, 3, 4, 5], 3)
 * // [4, 5]
 *
 * drop([1, 2, 3], 0)
 * // [1, 2, 3]
 *
 * drop([1, 2, 3], 5)
 * // []
 *
 * drop([1, 2, 3])
 * // [2, 3]
 * ```
 * @since 6.0.0
 * @param array - The array to query
 * @param n - The number of elements to drop (default: 1)
 * @returns - The slice of array
 */
function drop<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || array.length === 0) return []
  if (n <= 0) return array.slice()
  return array.slice(n)
}

export default drop
