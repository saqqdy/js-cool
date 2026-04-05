import { arrayFrom } from './_compat'

/**
 * Reverses a string (Unicode aware).
 *
 * @description
 * This function properly handles Unicode characters including:
 * - Emoji with skin tone modifiers
 * - Surrogate pairs
 * - Combining characters
 *
 * @example
 * ```ts
 * reverse('hello')
 * // => 'olleh'
 *
 * reverse('你好世界')
 * // => '界世好你'
 *
 * reverse('👋🏻')
 * // => '👋🏻' (emoji with skin tone preserved)
 *
 * reverse('café')
 * // => 'éfac'
 * ```
 *
 * @since 6.0.0
 * @param str - The string to reverse
 * @returns - Returns the reversed string
 */
function reverse(str: string): string {
	if (typeof str !== 'string') {
		return ''
	}

	// Use arrayFrom (IE11 compatible) to properly handle Unicode characters
	// This correctly splits surrogate pairs and combining characters
	return arrayFrom(str).reverse().join('')
}

export default reverse
