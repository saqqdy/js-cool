/**
 * Creates an object composed of the picked object properties.
 *
 * @example
 * ```ts
 * const object = { a: 1, b: 2, c: 3 }
 *
 * pick(object, ['a', 'c'])
 * // => { a: 1, c: 3 }
 *
 * pick(object, ['a'])
 * // => { a: 1 }
 * ```
 *
 * @since 5.24.0
 * @param obj - The source object
 * @param keys - The property paths to pick
 * @returns - Returns the new object
 */
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const result = {} as Pick<T, K>
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key]
		}
	}
	return result
}

export default pick
