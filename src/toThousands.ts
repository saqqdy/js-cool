import { repeatString } from './_compat'

/**
 * Options for toThousands
 */
export interface ToThousandsOptions {
	/**
	 * The separator to use between groups (default: ',')
	 */
	separator?: string
	/**
	 * Number of decimal places to keep
	 */
	decimals?: number
	/**
	 * Prefix to add before the number (e.g., '$', '¥')
	 */
	prefix?: string
	/**
	 * Suffix to add after the number (e.g., '%', '元')
	 */
	suffix?: string
}

/**
 * Digital thousandths division
 *
 * @example
 * ```js
 * // Basic usage
 * toThousands(10000000222)
 * // '10,000,000,222'
 *
 * // With decimal
 * toThousands(1234567.89)
 * // '1,234,567.89'
 *
 * // String input
 * toThousands('123456789')
 * // '123,456,789'
 *
 * // Zero
 * toThousands(0)
 * // '0'
 *
 * // Null/undefined
 * toThousands(null)
 * // ''
 *
 * // Custom separator
 * toThousands(1234567.89, { separator: ' ' })
 * // '1 234 567.89'
 *
 * toThousands(1234567.89, { separator: "'" })
 * // "1'234'567.89"
 *
 * // With decimals limit
 * toThousands(1234.5678, { decimals: 2 })
 * // '1,234.57'
 *
 * // With currency prefix
 * toThousands(1234.56, { prefix: '$' })
 * // '$1,234.56'
 *
 * toThousands(1234.56, { prefix: '¥', decimals: 2 })
 * // '¥1,234.56'
 *
 * // With suffix
 * toThousands(98.5, { suffix: '%', decimals: 1 })
 * // '98.5%'
 *
 * // Combined options
 * toThousands(1234567.89, { prefix: '$', separator: ' ', decimals: 2 })
 * // '$1 234 567.89'
 * ```
 *
 * @since 3.0.0
 * @param num - Input number or string
 * @param options - Formatting options
 * @returns - The formatted string
 */
function toThousands(num: string | number, options?: ToThousandsOptions): string {
	const { separator = ',', decimals, prefix = '', suffix = '' } = options ?? {}

	if (num === null || num === undefined) return ''
	if (num === 0 || num === '0') return `${prefix}0${suffix}`

	let numStr = num.toString()

	// Handle decimals
	if (decimals !== undefined) {
		const parts = numStr.split('.')
		if (parts.length === 1) {
			// No decimal part, add zeros if needed
			if (decimals > 0) {
				numStr = `${parts[0]}.${repeatString('0', decimals)}`
			}
		} else {
			// Has decimal part, round to specified decimals
			const rounded = Number(num).toFixed(decimals)
			numStr = rounded
		}
	}

	// Split integer and decimal parts
	const parts = numStr.split('.')
	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
	const decimalPart = parts[1] ? `.${parts[1]}` : ''

	return `${prefix}${integerPart}${decimalPart}${suffix}`
}

export default toThousands
