/**
 * ia array
 *
 * @param arr -
 */
function isArray(arr: any): arr is any[] {
	return Object.prototype.toString.call(arr).includes('Array')
}

export default isArray
