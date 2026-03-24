/**
 * Get the number in the string
 *
 * @example
 * ```js
 * // Version number
 * getNumber('Chrome123.33')
 * // '123.33'
 *
 * // Mixed with letters
 * getNumber('234test.88')
 * // '234.88'
 *
 * // Multiple numbers (concatenated)
 * getNumber('a1b2c3')
 * // '123'
 *
 * // With decimal
 * getNumber('Price: $99.99')
 * // '99.99'
 *
 * // Multiple decimal points (only keeps first)
 * getNumber('1.2.3.4')
 * // '1.234'
 *
 * // No numbers
 * getNumber('hello world')
 * // ''
 * ```
 * @since 1.0.1
 * @param string - pass in a string with a number
 * @returns - a pure numeric string (with at most one decimal point)
 */
function getNumber(string: string): string {
	// First extract all digits and decimal points
	const extracted = string.replace(/[^0-9.]/g, '')

	// Find the first decimal point and keep only that one
	const firstDotIndex = extracted.indexOf('.')
	if (firstDotIndex === -1) {
		return extracted
	}

	// Keep digits before first dot, the dot, and digits after (with other dots removed)
	const beforeDot = extracted.slice(0, firstDotIndex)
	const afterDot = extracted.slice(firstDotIndex + 1).replace(/\./g, '')

	return `${beforeDot}.${afterDot}`
}

export default getNumber
