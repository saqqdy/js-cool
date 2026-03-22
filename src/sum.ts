/**
 * Computes the sum of the values in array.
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4])
 * // => 10
 *
 * sum([0.1, 0.2, 0.3])
 * // => 0.6000000000000001
 *
 * sum([])
 * // => 0
 *
 * sum([-1, -2, 3])
 * // => 0
 * ```
 *
 * @since 6.0.0
 * @param array - The array to iterate over
 * @returns - Returns the sum
 */
function sum(array: number[]): number {
	if (!Array.isArray(array) || array.length === 0) {
		return 0
	}

	return array.reduce((acc, val) => acc + val, 0)
}

export default sum
