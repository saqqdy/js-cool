/**
 * Check if string is a valid credit card number using Luhn algorithm
 *
 * @example
 * ```ts
 * isCreditCard('4532015112830366')  // Visa
 * // => true
 *
 * isCreditCard('5555555555554444')  // MasterCard
 * // => true
 *
 * isCreditCard('378282246310005')   // American Express
 * // => true
 *
 * isCreditCard('1234567890123456')
 * // => false
 * ```
 *
 * @since 5.24.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid credit card number
 */
function isCreditCard(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}

	// Remove spaces and dashes
	const cleaned = value.replace(/[\s-]/g, '')

	// Must be 13-19 digits
	if (!/^\d{13,19}$/.test(cleaned)) {
		return false
	}

	// Luhn algorithm
	let sum = 0,
		isEven = false

	for (let i = cleaned.length - 1; i >= 0; i--) {
		let digit = Number.parseInt(cleaned[i], 10)

		if (isEven) {
			digit *= 2
			if (digit > 9) {
				digit -= 9
			}
		}

		sum += digit
		isEven = !isEven
	}

	return sum % 10 === 0
}

export default isCreditCard
