/**
 * Creates an object composed of the inverted keys and values of object.
 * If object contains duplicate values, subsequent values overwrite property assignments of previous values.
 *
 * @example
 * ```js
 * invert({ a: '1', b: '2', c: '3' })
 * // { '1': 'a', '2': 'b', '3': 'c' }
 *
 * invert({ a: 1, b: 2, c: 1 })
 * // { '1': 'c', '2': 'b' }
 *
 * invert({ x: 'apple', y: 'banana' })
 * // { apple: 'x', banana: 'y' }
 * ```
 * @since 6.0.0
 * @param object - The object to invert
 * @returns - The new inverted object
 */
function invert<T extends Record<string, string | number>>(object: T): Record<string, string> {
  const result: Record<string, string> = {}

  if (!object || typeof object !== 'object') return result

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key] as string | number
      result[String(value)] = key
    }
  }

  return result
}

export default invert
