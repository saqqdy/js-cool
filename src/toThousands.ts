/**
 * Digital thousandths division
 *
 * @param num - the number
 * @returns result - the split string
 */
function toThousands(num: string | number): string {
	if (!num) return +num === 0 ? '0' : ''
	num = num.toString()
	if (num.split('.').length === 1) return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	return num.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + num.split('.')[1]
}

export default toThousands
