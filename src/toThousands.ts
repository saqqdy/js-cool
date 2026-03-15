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
 * ```
 * @since 3.0.0
 * @param num - input number
 * @returns - the split string
 */
function toThousands(num: string | number): string {
	if (!num) return num === 0 || num === '0' ? '0' : ''
	num = num.toString()
	if (num.split('.').length === 1) return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

	return `${num.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,')}.${num.split('.')[1]}`
}

export default toThousands
