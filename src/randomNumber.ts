/**
 * Get a random integer
 *
 * @param min - the minimum value of the random number
 * @param max - the maximum value of the random number
 * @returns returns the number
 */
function randomNumber(min = 1, max = 10): number {
	const Range = max - min
	const Rand = Math.random()
	return min + Math.round(Rand * Range)
}

export default randomNumber
