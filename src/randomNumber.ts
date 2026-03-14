/**
 * Get a random integer
 *
 * @example
 * ```js
 * // Default range (1-10)
 * randomNumber()
 * // 8
 *
 * // Custom range
 * randomNumber(1, 100)
 * // 42
 *
 * // Small range
 * randomNumber(1, 3)
 * // 2
 *
 * // Decimal range (still returns integer)
 * randomNumber(0.1, 0.9)
 * // 0 or 1
 *
 * // Single value range
 * randomNumber(5, 5)
 * // 5
 * ```
 * @since 5.0.0
 * @param min - the minimum value of the random number (default: 1)
 * @param max - the maximum value of the random number (default: 10)
 * @returns - random integer between min and max (inclusive)
 */
function randomNumber(min = 1, max = 10): number {
	return min + Math.round(Math.random() * (max - min))
}

export default randomNumber
