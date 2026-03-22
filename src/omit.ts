/**
 * Creates an object composed of the own and inherited enumerable property paths of object that are not omitted.
 *
 * @example
 * ```ts
 * const object = { a: 1, b: 2, c: 3 }
 *
 * omit(object, ['a', 'c'])
 * // => { b: 2 }
 *
 * omit(object, ['a'])
 * // => { b: 2, c: 3 }
 * ```
 *
 * @since 6.0.0
 * @param obj - The source object
 * @param keys - The property paths to omit
 * @returns - Returns the new object
 */
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	const result = { ...obj }
	for (const key of keys) {
		delete result[key]
	}
	return result as Omit<T, K>
}

export default omit
