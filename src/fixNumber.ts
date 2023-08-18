import pattern from './pattern'

/**
 * Intercept the decimal places, do not fill in the missing 0
 *
 * @example
 * ```js
 * fixNumber('100.888')
 * // 100.88
 *
 * fixNumber('100.8', 2)
 * // 100.8
 *
 * fixNumber('100.8888', 3)
 * // 100.888
 * ```
 * @param number - the number of digits to be processed, required
 * @param n - the number of decimal places to keep, default is 2
 * @returns - the new number
 */
function fixNumber(number: string | number, n = 2) {
	const reg = new RegExp('^(.*\\..{' + n + '}).*$')
	number = '' + number
	if (!pattern.number.test(number)) throw new Error('"number" is not a number')

	return parseFloat(number.replace(reg, '$1'))
}

export default fixNumber
