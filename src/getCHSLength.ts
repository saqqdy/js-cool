/**
 * Get the length of the text, Chinese counts as 2 bytes
 *
 * @example
 * ```js
 * getCHSLength('测试')
 * // 2
 * ```
 * @param str - string
 * @returns - length
 */
function getCHSLength(str: string): number {
	// eslint-disable-next-line no-control-regex
	return str.replace(/[^\x00-\xFF]/g, '**').length
}

export default getCHSLength
