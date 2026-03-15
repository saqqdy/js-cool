/**
 * Whether the array contains the specified element
 *
 * @example
 * ```js
 * // Basic usage
 * contains([1, 2], 2) // true
 * contains([1, 2], 3) // false
 *
 * // With strings
 * contains(['a', 'b', 'c'], 'b') // true
 *
 * // With objects (reference comparison)
 * const obj = { a: 1 }
 * contains([obj, { b: 2 }], obj) // true
 * contains([obj, { b: 2 }], { a: 1 }) // false
 *
 * // Empty array
 * contains([], 1) // false
 * ```
 * @since 2.2.1
 * @param arr - the target array
 * @param item - the target to find
 * @returns boolean
 */
function contains(arr: any[], item: any): boolean {
	for (const el of arr) {
		if (el === item) return true
	}

	return false
}

export default contains
