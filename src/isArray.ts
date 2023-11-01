/**
 * Determine if it is an array
 *
 * @example
 * ```js
 * isArray([]) // true
 * ```
 * @since 1.0.2
 * @param target - any target
 * @returns - target is Array
 */
function isArray(target: any): target is any[] {
	return Object.prototype.toString.call(target).includes('Array')
}

export default isArray
