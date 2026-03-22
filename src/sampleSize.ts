/**
 * Gets n random elements at unique keys from array up to the size of array.
 *
 * @example
 * ```ts
 * sampleSize([1, 2, 3, 4, 5], 2)
 * // => [3, 1] (2 random elements)
 *
 * sampleSize([1, 2, 3], 4)
 * // => [2, 3, 1] (all elements shuffled, since n > array.length)
 *
 * sampleSize(['a', 'b', 'c'], 2)
 * // => ['c', 'a'] (2 random elements)
 * ```
 *
 * @since 6.0.0
 * @param array - The array to sample from
 * @param n - The number of elements to sample (default: 1)
 * @returns - Returns the random elements
 */
function sampleSize<T>(array: T[], n = 1): T[] {
	if (!Array.isArray(array) || array.length === 0) {
		return []
	}

	const length = array.length
	const size = Math.min(Math.max(n, 0), length)

	// Fisher-Yates shuffle for partial selection
	const result = [...array]
	for (let i = 0; i < size; i++) {
		const j = i + Math.floor(Math.random() * (length - i))
		;[result[i], result[j]] = [result[j], result[i]]
	}

	return result.slice(0, size)
}

export default sampleSize
