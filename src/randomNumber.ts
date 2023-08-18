/**
 * Get a random integer
 *
 * @example
 * ```js
 * randomNumber()
 * // 8
 *
 * randomNumber(0.1, 0.9)
 * // 0.8
 * ```
 * @param min - the minimum value of the random number
 * @param max - the maximum value of the random number
 * @returns - random number
 */
function randomNumber(min = 1, max = 10): number {
	return min + Math.round(Math.random() * (max - min))
}

export default randomNumber
