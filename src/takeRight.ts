/**
 * Creates a slice of array with n elements taken from the end.
 *
 * @example
 * ```js
 * takeRight([1, 2, 3, 4, 5], 3)
 * // [3, 4, 5]
 *
 * takeRight([1, 2, 3], 0)
 * // []
 *
 * takeRight([1, 2, 3], 5)
 * // [1, 2, 3]
 *
 * takeRight([1, 2, 3])
 * // [3]
 * ```
 * @since 6.0.0
 * @param array - The array to query
 * @param n - The number of elements to take (default: 1)
 * @returns - The slice of array
 */
function takeRight<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || array.length === 0) return []
  if (n <= 0) return []
  const start = Math.max(0, array.length - n)
  return array.slice(start)
}

export default takeRight
