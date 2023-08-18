/**
 * Digital thousandths division
 *
 * @example
 * ```js
 * toThousands(10000000222)
 * // 10,000,000,222
 *
 * toThousands(100.2232323)
 * // 100.2232323
 *
 * toThousands(null)
 * // ''
 * ```
 * @param num - input number
 * @returns - the split string
 */
function toThousands(num: string | number): string {
	if (!num) return num === 0 || num === '0' ? '0' : ''
	num = num.toString()
	if (num.split('.').length === 1) return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	return num.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + num.split('.')[1]
}

export default toThousands
