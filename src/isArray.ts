/**
 * Determine if it is an array
 *
 * @example
 * ```js
 * isArray([]) // true
 * ```
 * @param target - any target
 * @returns - target is Array
 */
function isArray(target: any): target is any[] {
	return Object.prototype.toString.call(target).includes('Array')
}

export default isArray
