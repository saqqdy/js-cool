/**
 * Determine if it is an array
 *
 * @example
 * ```js
 * // Arrays
 * isArray([])           // true
 * isArray([1, 2, 3])    // true
 * isArray(['a', 'b'])   // true
 *
 * // Not arrays
 * isArray({})           // false
 * isArray('array')      // false
 * isArray(null)         // false
 * isArray(undefined)    // false
 * isArray(arguments)    // false
 *
 * // Array-like
 * isArray({ length: 0 }) // false
 * ```
 * @since 1.0.2
 * @param target - any target
 * @returns - target is Array
 */
function isArray(target: any): target is any[] {
	return Object.prototype.toString.call(target).includes('Array')
}

export default isArray
