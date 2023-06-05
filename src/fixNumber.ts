/**
 * Intercept the decimal places, do not fill in the missing 0
 *
 * @param number - the number of digits to be processed, required
 * @param n - the number of decimal places to keep, default is 2
 * @returns returns the new number
 */
function fixNumber(number: string | number, n = 2) {
	const reg = new RegExp('^(.*\\..{' + n + '}).*$')
	number = '' + number
	if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
		console.warn('Please pass in the number')
		return number
	}
	return parseFloat(number.replace(reg, '$1'))
}

export default fixNumber
