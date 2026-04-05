import { extract } from './patterns'

/**
 * Options for getNumber
 */
export interface GetNumberOptions {
	/**
	 * Return type: 'string' or 'number' (default: 'string')
	 */
	type?: 'string' | 'number'
	/**
	 * Extract all numbers instead of concatenating (default: false)
	 */
	multiple?: boolean
	/**
	 * Number of decimal places (only applies when type is 'string')
	 */
	decimals?: number
}

/**
 * Get the number(s) from a string.
 *
 * @example
 * ```js
 * // Basic usage - returns string
 * getNumber('Chrome123.33')
 * // '123.33'
 *
 * // Return as number
 * getNumber('Price: $99.99', { type: 'number' })
 * // 99.99
 *
 * // Extract multiple numbers
 * getNumber('a1b2c3', { multiple: true })
 * // [1, 2, 3]
 *
 * getNumber('Range: 10-20', { multiple: true })
 * // [10, 20]
 *
 * // With decimal places
 * getNumber('Temperature: 36.567°', { decimals: 1 })
 * // '36.5'
 *
 * // Multiple numbers as numbers
 * getNumber('1, 2, 3', { multiple: true, type: 'number' })
 * // [1, 2, 3]
 * ```
 *
 * @since 1.0.1
 * @param string - The string to extract numbers from
 * @param options - Options for extraction
 * @returns - The extracted number(s)
 */
function getNumber(
	string: string,
	options?: GetNumberOptions & { multiple?: false }
): string | number
function getNumber(
	string: string,
	options?: GetNumberOptions & { multiple: true }
): (string | number)[]
function getNumber(
	string: string,
	options?: GetNumberOptions
): string | number | (string | number)[]
function getNumber(
	string: string,
	options?: GetNumberOptions
): string | number | (string | number)[] {
	const { type = 'string', multiple = false, decimals } = options ?? {}

	if (typeof string !== 'string' || !string) {
		return multiple ? [] : (type === 'number' ? 0 : '')
	}

	if (multiple) {
		// Extract all numbers (including decimals) using extract pattern
		const matches = string.match(extract.number) || []
		const numbers = matches.map((match) => {
			const num = parseFloat(match)
			if (type === 'number') {
				return isNaN(num) ? 0 : num
			}
			if (decimals !== undefined) {
				return num.toFixed(decimals)
			}
			return match
		})
		return numbers
	}

	// Single number extraction (original behavior)
	// First extract all digits, minus signs, and decimal points
	const extracted = string.replace(/[^0-9.-]/g, '')

	// Find the first decimal point and keep only that one
	const firstDotIndex = extracted.indexOf('.')
	if (firstDotIndex === -1) {
		const result = extracted
		if (type === 'number') {
			return parseFloat(result) || 0
		}
		return result
	}

	// Keep digits before first dot, the dot, and digits after (with other dots removed)
	const beforeDot = extracted.slice(0, firstDotIndex)
	const afterDot = extracted.slice(firstDotIndex + 1).replace(/\./g, '')

	let result = `${beforeDot}.${afterDot}`

	if (decimals !== undefined) {
		const num = parseFloat(result)
		result = num.toFixed(decimals)
	}

	if (type === 'number') {
		return parseFloat(result) || 0
	}

	return result
}

export default getNumber
