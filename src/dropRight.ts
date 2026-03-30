/**
 * Creates a slice of array with n elements dropped from the end.
 *
 * @example
 * ```js
 * dropRight([1, 2, 3, 4, 5], 3)
 * // [1, 2]
 *
 * dropRight([1, 2, 3], 0)
 * // [1, 2, 3]
 *
 * dropRight([1, 2, 3], 5)
 * // []
 *
 * dropRight([1, 2, 3])
 * // [1, 2]
 * ```
 * @since 6.0.0
 * @param array - The array to query
 * @param n - The number of elements to drop (default: 1)
 * @returns - The slice of array
 */
function dropRight<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || array.length === 0) return []
  if (n <= 0) return array.slice()
  const end = Math.max(0, array.length - n)
  return array.slice(0, end)
}

export default dropRight
