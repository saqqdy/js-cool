/**
 * Flattens array a single level deep.
 *
 * @example
 * ```ts
 * flatten([1, [2, 3], [4, [5]]])
 * // => [1, 2, 3, [5]]
 * ```
 *
 * @since 5.24.0
 * @param array - The array to flatten
 * @returns - Returns the new flattened array
 */
function flatten<T>(array: (T | T[])[]): T[] {
	if (!Array.isArray(array)) {
		return []
	}

	const result: T[] = []
	for (const item of array) {
		if (Array.isArray(item)) {
			result.push(...item)
		} else {
			result.push(item)
		}
	}
	return result
}

/**
 * Recursively flattens array.
 *
 * @example
 * ```ts
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 * ```
 *
 * @since 5.24.0
 * @param array - The array to flatten
 * @returns - Returns the new flattened array
 */
function flattenDeep<T>(array: any[]): T[] {
	if (!Array.isArray(array)) {
		return []
	}

	const result: T[] = []
	for (const item of array) {
		if (Array.isArray(item)) {
			result.push(...flattenDeep<T>(item))
		} else {
			result.push(item)
		}
	}
	return result
}

export { flatten, flattenDeep }
export default flattenDeep
