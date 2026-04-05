/**
 * Swaps the case of each character in a string.
 *
 * @example
 * ```ts
 * swapCase('Hello World')
 * // => 'hELLO wORLD'
 *
 * swapCase('JavaScript')
 * // => 'jAVAsCRIPT'
 *
 * swapCase('ABCdef')
 * // => 'abcDEF'
 *
 * swapCase('123abc')
 * // => '123ABC'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to swap case
 * @returns - Returns the string with swapped case
 */
function swapCase(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	return str
		.split('')
		.map((char) => {
			if (char >= 'a' && char <= 'z') {
				return char.toUpperCase()
			}
			if (char >= 'A' && char <= 'Z') {
				return char.toLowerCase()
			}
			return char
		})
		.join('')
}

export default swapCase
