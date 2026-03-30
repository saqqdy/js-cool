/**
 * This method is like findIndex except that it iterates over elements of collection from right to left.
 *
 * @example
 * ```js
 * const users = [
 *   { user: 'barney', active: true },
 *   { user: 'fred', active: false },
 *   { user: 'pebbles', active: false }
 * ]
 *
 * findLastIndex(users, ({ active }) => active)
 * // 0
 *
 * findLastIndex(users, { user: 'fred' })
 * // 1
 *
 * findLastIndex(users, ['user', 'pebbles'])
 * // 2
 *
 * findLastIndex(users, 'active')
 * // 0
 *
 * findLastIndex([1, 2, 3, 4], n => n > 2)
 * // 3
 * ```
 * @since 6.0.0
 * @param array - The array to inspect
 * @param predicate - The function invoked per iteration
 * @param fromIndex - The index to search from (default: array.length - 1)
 * @returns - The index of the found element, else -1
 */
function findLastIndex<T>(
  array: T[],
  predicate:
    | ((value: T, index: number, array: T[]) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | string
    | null
    | undefined,
  fromIndex?: number
): number {
  if (!Array.isArray(array) || array.length === 0) return -1

  const end =
    fromIndex === undefined
      ? array.length - 1
      : fromIndex < 0
        ? Math.max(0, array.length + fromIndex)
        : Math.min(fromIndex, array.length - 1)

  // Handle different predicate types
  if (typeof predicate === 'function') {
    for (let i = end; i >= 0; i--) {
      if (predicate(array[i], i, array)) return i
    }
  } else if (Array.isArray(predicate) && predicate.length === 2) {
    const [key, value] = predicate as [keyof T, unknown]
    for (let i = end; i >= 0; i--) {
      if (array[i]?.[key] === value) return i
    }
  } else if (typeof predicate === 'object' && predicate !== null) {
    const matches = predicate as Partial<T>
    for (let i = end; i >= 0; i--) {
      const item = array[i]
      if (item && typeof item === 'object') {
        const keys = Object.keys(matches) as (keyof T)[]
        if (keys.every(key => item[key] === matches[key])) {
          return i
        }
      }
    }
  } else if (typeof predicate === 'string') {
    const key = predicate
    for (let i = end; i >= 0; i--) {
      if (array[i] && (array[i] as any)[key]) return i
    }
  } else {
    for (let i = end; i >= 0; i--) {
      if (array[i]) return i
    }
  }

  return -1
}

export default findLastIndex
