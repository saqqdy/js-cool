/**
 * This method is like minus except that it accepts iteratee which is invoked for each
 * element of array and values to generate the criterion by which they're compared.
 *
 * @example
 * ```js
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // [1.2]
 *
 * differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x')
 * // [{ x: 2 }]
 *
 * differenceBy([1, 2, 3], [2], n => n * 2)
 * // [1, 3]  (because 1*2=2 not in [4], 3*2=6 not in [4])
 * ```
 * @since 6.0.0
 * @param array - The array to inspect
 * @param values - The values to exclude
 * @param iteratee - The iteratee invoked per element
 * @returns - The new array of filtered values
 */
function differenceBy<T>(
  array: T[],
  values: T[],
  iteratee?: ((value: T) => unknown) | keyof T | null
): T[] {
  if (!Array.isArray(array)) return []
  if (!Array.isArray(values) || values.length === 0) return array.slice()

  const getKey =
    iteratee === null || iteratee === undefined
      ? (item: T) => item
      : typeof iteratee === 'function'
        ? iteratee
        : (item: T) => item?.[iteratee as keyof T]

  const excludedKeys = new Set(values.map(v => getKey(v)))

  return array.filter(item => !excludedKeys.has(getKey(item)))
}

export default differenceBy
