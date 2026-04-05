import randomNumber from './randomNumber'
import shuffle from './shuffle'

/**
 * Generate n random integers that sum to a fixed sum
 *
 * Uses an improved algorithm for better distribution.
 *
 * @example
 * ```js
 * // Default: single number that sums to 100
 * randomNumbers()
 * // [100]
 *
 * // 4 numbers summing to 5 (no zeros)
 * randomNumbers(4, 5)
 * // [1, 1, 2, 1]
 *
 * // Allow zeros
 * randomNumbers(4, 5, false)
 * // [0, 1, 2, 2]
 *
 * // Distribution
 * randomNumbers(3, 100)
 * // [33, 34, 33]
 *
 * // Error: sum < n when noZero is true
 * // randomNumbers(5, 3) // throws Error
 * ```
 * @since 5.4.0
 * @param n - Number of generated integers, default: 1
 * @param sum - Sum of generated integers, default: 100
 * @param noZero - Generate integers that are not zero, default: true
 * @returns - array of random integers
 */
function randomNumbers(n?: number, sum?: number, noZero?: boolean): number[] {
	n ??= 1
	sum ??= 100
	noZero ??= true

	if (noZero && sum < n) throw new Error('When "noZero" is true, "sum" cannot be less than "n"')

	// Generate n+1 random points to partition the sum
	const points: number[] = [0, sum]
	const minValue = noZero ? 1 : 0

	// Generate random breakpoints
	for (let i = 0; i < n - 1; i++) {
		// Calculate valid range for breakpoint
		// Each segment must be at least minValue
		const maxPoint = sum - minValue * (n - 1 - i)
		const minPoint = minValue * (i + 1)
		points.push(randomNumber(minPoint, maxPoint))
	}

	// Sort points to create segments
	points.sort((a, b) => a - b)

	// Calculate differences between consecutive points
	const result: number[] = []
	for (let i = 1; i <= n; i++) {
		result.push(points[i] - points[i - 1])
	}

	return shuffle(result)
}

export default randomNumbers
