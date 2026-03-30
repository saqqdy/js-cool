/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * predicate returns truthy for, the second of which contains elements predicate returns falsy for.
 *
 * @example
 * ```js
 * const users = [
 *   { user: 'barney', age: 36, active: true },
 *   { user: 'fred', age: 40, active: false },
 *   { user: 'pebbles', age: 1, active: true }
 * ]
 *
 * partition(users, ({ active }) => active)
 * // [
 * //   [{ user: 'barney', age: 36, active: true }, { user: 'pebbles', age: 1, active: true }],
 * //   [{ user: 'fred', age: 40, active: false }]
 * // ]
 *
 * partition([1, 2, 3, 4], n => n % 2 === 0)
 * // [[2, 4], [1, 3]]
 *
 * partition([{ a: 1 }, { a: 2 }, { a: 1 }], 'a', 1)
 * // [[{ a: 1 }, { a: 1 }], [{ a: 2 }]]
 * ```
 * @since 6.0.0
 * @param array - The array to partition
 * @param predicate - The function invoked per iteration
 * @returns - The array of grouped elements
 */
function partition<T>(
  array: T[],
  predicate?: ((value: T, index: number, array: T[]) => unknown) | keyof T | [keyof T, unknown] | string | null
): [T[], T[]] {
  if (!Array.isArray(array)) return [[], []]

  const pass: T[] = []
  const fail: T[] = []

  // Handle different predicate types
  if (typeof predicate === 'function') {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (predicate(item, i, array)) {
        pass.push(item)
      } else {
        fail.push(item)
      }
    }
  } else if (Array.isArray(predicate) && predicate.length === 2) {
    const [key, value] = predicate as [keyof T, unknown]
    for (const item of array) {
      if (item?.[key] === value) {
        pass.push(item)
      } else {
        fail.push(item)
      }
    }
  } else if (typeof predicate === 'string') {
    const key = predicate as keyof T
    for (const item of array) {
      if (item?.[key]) {
        pass.push(item)
      } else {
        fail.push(item)
      }
    }
  } else if (predicate === null || predicate === undefined) {
    for (const item of array) {
      if (item) {
        pass.push(item)
      } else {
        fail.push(item)
      }
    }
  } else {
    // predicate is a key of T (object property to check)
    const key = predicate as keyof T
    for (const item of array) {
      if (item?.[key]) {
        pass.push(item)
      } else {
        fail.push(item)
      }
    }
  }

  return [pass, fail]
}

export default partition
