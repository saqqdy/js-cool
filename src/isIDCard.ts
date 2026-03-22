/**
 * Check if string is a valid Chinese ID card number (18-digit)
 *
 * @example
 * ```ts
 * isIDCard('11010519491231002X')
 * // => true
 *
 * isIDCard('11010519491231002x')
 * // => true (lowercase x is also valid)
 *
 * isIDCard('123456789012345678')
 * // => false (invalid checksum)
 *
 * isIDCard('1234567890')
 * // => false (wrong length)
 * ```
 *
 * @since 6.0.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid Chinese ID card number
 */
function isIDCard(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}

	// 18-digit ID card format
	const idCardRegex = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/

	if (!idCardRegex.test(value)) {
		return false
	}

	// Verify checksum
	const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
	const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

	let sum = 0
	for (let i = 0; i < 17; i++) {
		sum += Number.parseInt(value[i], 10) * weights[i]
	}

	const checkCode = checkCodes[sum % 11]
	return value[17].toUpperCase() === checkCode
}

export default isIDCard
