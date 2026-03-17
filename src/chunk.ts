/**
 * Creates an array of elements split into groups the length of size.
 *
 * @example
 * ```ts
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 *
 * chunk(['a', 'b', 'c', 'd'], 1)
 * // => [['a'], ['b'], ['c'], ['d']]
 * ```
 *
 * @since 5.24.0
 * @param array - The array to process
 * @param size - The length of each chunk (default: 1)
 * @returns - Returns the new array of chunks
 */
function chunk<T>(array: T[], size = 1): T[][] {
	if (!Array.isArray(array) || array.length === 0) {
		return []
	}

	const result: T[][] = []
	const length = array.length
	const chunkSize = Math.max(1, Math.floor(size))

	for (let i = 0; i < length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize))
	}

	return result
}

export default chunk
