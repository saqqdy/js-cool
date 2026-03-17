/**
 * Checks if number is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 *
 * @example
 * ```ts
 * inRange(3, 1, 5)
 * // => true
 *
 * inRange(5, 1, 5)
 * // => false (end is exclusive)
 *
 * inRange(1, 5)
 * // => true (start is 0, end is 5)
 *
 * inRange(5, 2)
 * // => false (start is 0, end is 2)
 *
 * inRange(-3, -5, 0)
 * // => true
 * ```
 *
 * @since 5.24.0
 * @param number - The number to check
 * @param start - The start of the range
 * @param end - The end of the range
 * @returns - Returns true if number is in range
 */
function inRange(number: number, start: number, end?: number): boolean {
	if (end === undefined) {
		end = start
		start = 0
	}

	// Handle negative ranges
	if (start > end) {
		const temp = start
		start = end
		end = temp
	}

	return number >= start && number < end
}

export default inRange
