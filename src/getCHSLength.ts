/**
 * Check if a character is a full-width character (CJK, emoji, etc.)
 * Full-width characters count as 2 bytes in display width
 */
const isFullWidth = (char: string): boolean => {
	const code = char.codePointAt(0) ?? 0
	// CJK Unified Ideographs and extensions
	// CJK Radicals Supplement, Kangxi Radicals, etc.
	// Also covers most emoji and other wide characters
	return (
		code > 0xFF &&
		(code < 0x0300 || code > 0x036F) && // Exclude combining diacritical marks
		!(code >= 0x2000 && code <= 0x206F) // Exclude General Punctuation that might be narrow
	)
}

/**
 * Get the length of the text, Chinese counts as 2 bytes
 *
 * @example
 * ```js
 * // Pure Chinese
 * getCHSLength('测试')
 * // 4
 *
 * // Pure English
 * getCHSLength('test')
 * // 4
 *
 * // Mixed content
 * getCHSLength('测试test')
 * // 8 (4 + 4)
 *
 * // With numbers
 * getCHSLength('测试123')
 * // 7 (4 + 3)
 *
 * // Empty string
 * getCHSLength('')
 * // 0
 * ```
 * @since 1.0.1
 * @param str - string
 * @returns - length (Chinese characters count as 2)
 */
function getCHSLength(str: string): number {
	let length = 0
	for (const char of str) {
		length += isFullWidth(char) ? 2 : 1
	}
	return length
}

export default getCHSLength
export { isFullWidth }
