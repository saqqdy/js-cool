import pattern from './pattern'

/**
 * Intercept the decimal places, do not fill in the missing 0
 *
 * @example
 * ```js
 * // Default 2 decimal places
 * fixNumber('100.888')
 * // 100.88
 *
 * // No padding for missing decimals
 * fixNumber('100.8', 2)
 * // 100.8
 *
 * // Custom decimal places
 * fixNumber('100.8888', 3)
 * // 100.888
 *
 * // With number input
 * fixNumber(123.4567, 2)
 * // 123.45
 *
 * // Integer returns as-is
 * fixNumber('100', 2)
 * // 100
 * ```
 * @since 1.0.2
 * @param number - the number of digits to be processed, required
 * @param n - the number of decimal places to keep, default is 2
 * @returns - the new number (not padded with zeros)
 */
function fixNumber(number: string | number, n = 2): number {
	const reg = new RegExp(`^(.*\\..{${n}}).*$`)

	number = `${number}`
	if (!pattern.number.test(number)) throw new Error('"number" is not a number')

	return Number.parseFloat(number.replace(reg, '$1'))
}

export default fixNumber
