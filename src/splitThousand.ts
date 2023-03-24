/**
 * 数字千分位分割
 *
 * @param num - 数字
 * @returns result - 分割后的字符串
 */
function splitThousand(num: string | number): string {
	if (!num) return +num === 0 ? '0' : ''
	num = num.toString()
	if (num.split('.').length === 1) return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	return num.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,') + '.' + num.split('.')[1]
}

export default splitThousand
