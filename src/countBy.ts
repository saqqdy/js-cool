/**
 * Creates an object composed of keys generated from the results of running each element
 * of collection thru iteratee.
 *
 * @example
 * ```js
 * countBy([6.1, 4.2, 6.3], Math.floor)
 * // { '4': 1, '6': 2 }
 *
 * countBy(['one', 'two', 'three'], 'length')
 * // { '3': 2, '5': 1 }
 *
 * countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // { 'a': 2, 'b': 1 }
 *
 * countBy(['apple', 'banana', 'apricot'], item => item[0])
 * // { 'a': 2, 'b': 1 }
 * ```
 * @since 6.0.0
 * @param array - The array to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns - The composed aggregate object
 */
function countBy<T>(
  array: T[],
  iteratee?: ((value: T) => string | number) | keyof T | null
): Record<string, number> {
  const result: Record<string, number> = {}

  if (!Array.isArray(array) || array.length === 0) return result

  // Default to identity function
  const getKey =
    iteratee === null || iteratee === undefined
      ? (item: T) => String(item)
      : typeof iteratee === 'function'
        ? (item: T) => String(iteratee(item))
        : (item: T) => String(item?.[iteratee as keyof T])

  for (const item of array) {
    const key = getKey(item)
    result[key] = (result[key] || 0) + 1
  }

  return result
}

export default countBy
