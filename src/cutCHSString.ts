/**
 * Intercept string, Chinese counts as 2 bytes
 *
 * @param str - the string to be intercepted
 * @param len -
 * @param hasDot -
 * @returns returns the intercepted string
 */
function cutCHSString(str: string, len: number = str.length, hasDot = false) {
	if (!str) return ''
	let newLength = 0,
		newStr = '',
		singleChar = ''
	// eslint-disable-next-line no-control-regex
	const chineseRegex = /[^\x00-\xFF]/g
	const strLength = str.replace(chineseRegex, '**').length
	for (let i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString()
		if (singleChar.match(chineseRegex) != null) {
			newLength += 2
		} else {
			newLength++
		}
		if (newLength > len) {
			break
		}
		newStr += singleChar
	}

	if (hasDot && strLength > len) {
		newStr += '...'
	}
	return newStr
}

export default cutCHSString
