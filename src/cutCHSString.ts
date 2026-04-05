import getCHSLength, { isFullWidth } from './getCHSLength'

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
 * @param len - the length to intercept (default: string byte length)
 * @param hasDot - whether to add ellipsis when truncated (default: false)
 * @returns - the intercepted string
 */
function cutCHSString(str: string, len?: number, hasDot = false): string {
	if (!str) return ''

	const byteLength = getCHSLength(str)
	const targetLen = len ?? byteLength

	// If target length is >= string byte length, return as-is
	if (targetLen >= byteLength) {
		return str
	}

	let currentLength = 0,
	 result = ''

	for (const char of str) {
		const charLen = isFullWidth(char) ? 2 : 1
		if (currentLength + charLen > targetLen) {
			break
		}
		result += char
		currentLength += charLen
	}

	if (hasDot) {
		result += '...'
	}

	return result
}

export default cutCHSString
