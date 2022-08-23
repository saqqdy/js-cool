/**
 * 判断是否数组
 *
 * @param arr -
 */
function isArray(arr: any): arr is any[] {
	return Object.prototype.toString.call(arr).indexOf('Array') !== -1
}

export default isArray
