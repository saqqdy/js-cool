/**
 * Computes number rounded to precision.
 *
 * @example
 * ```ts
 * round(4.006)
 * // => 4
 *
 * round(4.006, 2)
 * // => 4.01
 *
 * round(4060, -2)
 * // => 4100
 *
 * round(4.5)
 * // => 5
 *
 * round(4.4)
 * // => 4
 * ```
 *
 * @since 6.0.0
 * @param number - The number to round
 * @param precision - The precision to round to (default: 0)
 * @returns - Returns the rounded number
 */
function round(number: number, precision = 0): number {
	const factor = 10 ** precision
	const temp = Math.round(number * factor * 1e10) / 1e10
	return Math.round(temp) / factor
}

export default round
