/**
 * Intercept string, Chinese counts as 2 bytes
 *
 * @example
 * ```js
 * // Basic usage
 * cutCHSString('Hello世界', 7)
 * // 'Hello世'
 *
 * // With ellipsis
 * cutCHSString('Hello世界你好', 8, true)
 * // 'Hello世...'
 *
 * // Pure Chinese
 * cutCHSString('中文测试字符串', 6)
 * // '中文测试'
 *
 * // Pure English
 * cutCHSString('HelloWorld', 5)
 * // 'Hello'
 *
 * // Default length (entire string)
 * cutCHSString('测试')
 * // '测试'
 * ```
 * @since 1.0.1
 * @param str - the string to be intercepted
 * @param len - the length to intercept (default: string length)
 * @param hasDot - whether to add ellipsis when truncated (default: false)
 * @returns - the intercepted string
 */
function cutCHSString(str: string, len: number = str.length, hasDot = false): string {
	if (!str) return ''
	let newLength = 0,
		newStr = '',
		singleChar = ''
	// eslint-disable-next-line no-control-regex, regexp/no-control-character
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
