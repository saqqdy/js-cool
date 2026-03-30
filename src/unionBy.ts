/**
 * This method is like union except that it accepts iteratee which is invoked for each
 * element of each array to generate the criterion by which uniqueness is computed.
 *
 * @example
 * ```js
 * unionBy([2.1], [1.2, 2.3], Math.floor)
 * // [2.1, 1.2]
 *
 * unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
 * // [{ x: 1 }, { x: 2 }]
 *
 * unionBy([1, 2], [2, 3], n => n)
 * // [1, 2, 3]
 * ```
 * @since 6.0.0
 * @param arrays - The arrays to inspect
 * @param iteratee - The iteratee invoked per element
 * @returns - The new array of combined values
 */
export type Iteratee<T> = ((value: T) => unknown) | keyof T

function unionBy<T>(...args: [...arrays: T[][]]): T[]
function unionBy<T>(...args: [...arrays: T[][], iteratee: Iteratee<T>]): T[]
function unionBy<T>(...args: unknown[]): T[] {
  if (args.length === 0) return []

  // Extract iteratee if last argument is a function or string
  let iteratee: ((value: T) => unknown) | keyof T | null = null,
   arrays: T[][]

  const lastArg = args[args.length - 1]
  if (typeof lastArg === 'function' || typeof lastArg === 'string') {
    iteratee = lastArg as ((value: T) => unknown) | keyof T
    arrays = args.slice(0, -1) as T[][]
  } else {
    arrays = args as T[][]
  }

  if (arrays.length === 0) return []

  const getKey = iteratee
    ? typeof iteratee === 'function'
      ? iteratee
      : (item: T) => item?.[iteratee as keyof T]
    : (item: T) => item

  const result: T[] = []
  const seenKeys = new Set()

  for (const array of arrays) {
    if (!Array.isArray(array)) continue
    for (const item of array) {
      const key = getKey(item)
      if (!seenKeys.has(key)) {
        seenKeys.add(key)
        result.push(item)
      }
    }
  }

  return result
}

export default unionBy
