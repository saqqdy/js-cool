/**
 * Creates a slice of array with n elements taken from the beginning.
 *
 * @example
 * ```js
 * take([1, 2, 3, 4, 5], 3)
 * // [1, 2, 3]
 *
 * take([1, 2, 3], 0)
 * // []
 *
 * take([1, 2, 3], 5)
 * // [1, 2, 3]
 *
 * take([1, 2, 3])
 * // [1]
 * ```
 * @since 6.0.0
 * @param array - The array to query
 * @param n - The number of elements to take (default: 1)
 * @returns - The slice of array
 */
function take<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || array.length === 0) return []
  if (n <= 0) return []
  return array.slice(0, n)
}

export default take
