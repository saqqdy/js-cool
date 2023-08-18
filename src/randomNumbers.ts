import randomNumber from './randomNumber'
import shuffle from './shuffle'

/**
 * Generate n random integers that sum to a fixed sum
 *
 * @example
 * ```js
 * randomNumbers()
 * // [8]
 *
 * randomNumbers(4, 5)
 * // [1, 1, 2, 1]
 *
 * randomNumbers(4, 5, false)
 * // [0, 1, 2, 2]
 * ```
 * @param n - Number of generated integers, default: 1
 * @param sum - Sum of generated integers, default: 100
 * @param max - Generate integers that are not zero, default: true
 * @returns - numbers
 */
function randomNumbers(n?: number, sum?: number, noZero?: boolean) {
	n ??= 1
	sum ??= 100
	noZero ??= true

	if (noZero && sum < n) throw new Error('When "noZero" is true, "sum" cannot be less than "n"')

	let _reached = 0
	// const _max = noZero ? Math.round(sum / n) : Math.ceil(sum / n)
	const _max = Math.round(sum / n)
	const numbers = []
	while (--n > 0) {
		const num = randomNumber(noZero ? 1 : 0, _max)
		_reached += num
		numbers.push(num)
	}
	numbers.push(sum - _reached)
	return shuffle(numbers)
}

export default randomNumbers
