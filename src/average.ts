/**
 * Computes the average of the values in array.
 *
 * @example
 * ```ts
 * average([1, 2, 3, 4])
 * // => 2.5
 *
 * average([10, 20, 30])
 * // => 20
 *
 * average([])
 * // => NaN
 *
 * average([5])
 * // => 5
 * ```
 *
 * @since 5.24.0
 * @param array - The array to iterate over
 * @returns - Returns the average
 */
function average(array: number[]): number {
	if (!Array.isArray(array) || array.length === 0) {
		return Number.NaN
	}

	return array.reduce((acc, val) => acc + val, 0) / array.length
}

export default average
