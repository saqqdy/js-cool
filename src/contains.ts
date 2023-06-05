/**
 * Whether the array contains the specified element
 *
 * @example
 * ```js
 * contains([1, 2], 2) // true
 * contains([1, 2], 3) // false
 * ```
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
