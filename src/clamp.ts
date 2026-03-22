/**
 * Clamps number within the inclusive lower and upper bounds.
 *
 * @example
 * ```ts
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 *
 * clamp(3, -5, 5)
 * // => 3
 *
 * clamp(10, 5)
 * // => 5
 *
 * clamp(3, 5)
 * // => 3
 * ```
 *
 * @since 6.0.0
 * @param number - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns - Returns the clamped number
 */
function clamp(number: number, lower: number, upper?: number): number {
	if (upper === undefined) {
		upper = lower
		lower = 0
	}

	if (number < lower) {
		return lower
	}
	if (number > upper) {
		return upper
	}
	return number
}

export default clamp
