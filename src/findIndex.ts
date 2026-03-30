/**
 * Iterates over elements of collection, returning the first index of predicate returns truthy for.
 *
 * @example
 * ```js
 * const users = [
 *   { user: 'barney', active: false },
 *   { user: 'fred', active: false },
 *   { user: 'pebbles', active: true }
 * ]
 *
 * findIndex(users, ({ active }) => active)
 * // 2
 *
 * findIndex(users, { user: 'fred' })
 * // 1
 *
 * findIndex(users, ['user', 'barney'])
 * // 0
 *
 * findIndex(users, 'active')
 * // 2
 *
 * findIndex([1, 2, 3], n => n > 1)
 * // 1
 * ```
 * @since 6.0.0
 * @param array - The array to inspect
 * @param predicate - The function invoked per iteration
 * @param fromIndex - The index to search from (default: 0)
 * @returns - The index of the found element, else -1
 */
function findIndex<T>(
  array: T[],
  predicate:
    | ((value: T, index: number, array: T[]) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | string
    | null
    | undefined,
  fromIndex: number = 0
): number {
  if (!Array.isArray(array) || array.length === 0) return -1

  const start = Math.max(fromIndex < 0 ? Math.max(0, array.length + fromIndex) : fromIndex, 0)

  // Handle different predicate types
  if (typeof predicate === 'function') {
    for (let i = start; i < array.length; i++) {
      if (predicate(array[i], i, array)) return i
    }
  } else if (Array.isArray(predicate) && predicate.length === 2) {
    const [key, value] = predicate as [keyof T, unknown]
    for (let i = start; i < array.length; i++) {
      if (array[i]?.[key] === value) return i
    }
  } else if (typeof predicate === 'object' && predicate !== null) {
    const matches = predicate as Partial<T>
    for (let i = start; i < array.length; i++) {
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
    for (let i = start; i < array.length; i++) {
      if (array[i] && (array[i] as any)[key]) return i
    }
  } else {
    for (let i = start; i < array.length; i++) {
      if (array[i]) return i
    }
  }

  return -1
}

export default findIndex
