/**
 * Gets a random element from array.
 *
 * @example
 * ```ts
 * sample([1, 2, 3, 4])
 * // => 2 (random element)
 *
 * sample(['a', 'b', 'c'])
 * // => 'b' (random element)
 *
 * sample([])
 * // => undefined
 * ```
 *
 * @since 5.24.0
 * @param array - The array to sample from
 * @returns - Returns the random element
 */
function sample<T>(array: T[]): T | undefined {
	if (!Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

export default sample
