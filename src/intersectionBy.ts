/**
 * This method is like intersect except that it accepts iteratee which is invoked for each
 * element of each array to generate the criterion by which they're compared.
 *
 * @example
 * ```js
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // [2.1]
 *
 * intersectionBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x')
 * // [{ x: 1 }]
 *
 * intersectionBy([1, 2, 3], [2, 3, 4], n => n)
 * // [2, 3]
 * ```
 * @since 6.0.0
 * @param array - The first array to inspect
 * @param values - The second array to inspect
 * @param iteratee - The iteratee invoked per element
 * @returns - The new array of intersecting values
 */
function intersectionBy<T>(
  array: T[],
  values: T[],
  iteratee?: ((value: T) => unknown) | keyof T | null
): T[] {
  if (!Array.isArray(array) || !Array.isArray(values)) return []

  const getKey =
    iteratee === null || iteratee === undefined
      ? (item: T) => item
      : typeof iteratee === 'function'
        ? iteratee
        : (item: T) => item?.[iteratee as keyof T]

  const valueKeys = new Set(values.map(v => getKey(v)))
  const seenKeys = new Set()

  return array.filter(item => {
    const key = getKey(item)
    if (valueKeys.has(key) && !seenKeys.has(key)) {
      seenKeys.add(key)
      return true
    }
    return false
  })
}

export default intersectionBy
