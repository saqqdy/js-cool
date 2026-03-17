/**
 * Check if string is a valid phone number (Chinese mobile)
 *
 * @example
 * ```ts
 * isPhone('13800138000')
 * // => true
 *
 * isPhone('15912345678')
 * // => true
 *
 * isPhone('12345678901')
 * // => false
 *
 * isPhone('1380013800')
 * // => false (too short)
 * ```
 *
 * @since 5.24.0
 * @param value - The string to check
 * @returns - Returns true if string is a valid phone number
 */
function isPhone(value: string): boolean {
	if (typeof value !== 'string') {
		return false
	}
	const phoneRegex = /^1[3-9]\d{9}$/
	return phoneRegex.test(value)
}

export default isPhone
