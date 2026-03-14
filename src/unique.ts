import contains from './contains'

/**
 * Array de-duplication
 *
 * @example
 * ```js
 * // Basic usage
 * unique([1, 2, 2, '33'])
 * // [1, 2, '33']
 *
 * // With strings
 * unique(['a', 'b', 'a', 'c'])
 * // ['a', 'b', 'c']
 *
 * // Mixed types
 * unique([1, '1', 1, true, true])
 * // [1, '1', true]
 *
 * // With objects (reference comparison)
 * const obj = { a: 1 }
 * unique([obj, obj, { a: 1 }])
 * // [obj, { a: 1 }] (two different objects)
 *
 * // Empty array
 * unique([])
 * // []
 * ```
 * @since 2.2.1
 * @param arr - array data
 * @returns - new array with unique values
 */
function unique<T = unknown>(arr: T[]): T[] {
	const newArray: T[] = []
	for (const el of arr) {
		!contains(newArray, el) && newArray.push(el)
	}
	return newArray
}

export default unique
