/**
 * 截取小数点后几位，不足的不补0
 * @param [Number, String] number 要处理的数字，必填
 * @param number
 * @param {number} n 要保留的小数点位数，默认保留2位
 * @returns {number} 返回新数字
 */
function fixNumber(number, n = 2) {
	let reg = new RegExp('^(.*\\..{' + n + '}).*$')
	number += ''
	if (!/^(\-|\+)?\d+(\.\d+)?$/.test(number)) {
		console.warn('请传入数字')
		return number
	}
	return parseFloat(number.replace(reg, '$1'), 10)
}

export default fixNumber
