/**
 * @description 判断是否数组
 * @param {Array} arr
 */
function isArray(arr) {
	return Object.prototype.toString.call(arr).indexOf('Array') !== -1
}

export default isArray
