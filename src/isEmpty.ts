import isArray from './isArray'
import isObject from './isObject'

/**
 * Checks if value is an empty object, collection, map, or set.
 *
 * @example
 * ```ts
 * isEmpty(null)
 * // => true
 *
 * isEmpty(undefined)
 * // => true
 *
 * isEmpty('')
 * // => true
 *
 * isEmpty([])
 * // => true
 *
 * isEmpty({})
 * // => true
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty({ a: 1 })
 * // => false
 *
 * isEmpty(1)
 * // => false
 *
 * isEmpty(true)
 * // => false
 * ```
 *
 * @since 6.0.0
 * @param value - The value to check
 * @returns - Returns true if value is empty, else false
 */
function isEmpty(value: unknown): boolean {
	// null or undefined
	if (value == null) {
		return true
	}

	// Array or String
	if (isArray(value) || typeof value === 'string') {
		return value.length === 0
	}

	// Map or Set (IE11 may not support)
	if (typeof Map !== 'undefined' && value instanceof Map) {
		return value.size === 0
	}
	if (typeof Set !== 'undefined' && value instanceof Set) {
		return value.size === 0
	}

	// Object
	if (isObject(value)) {
		return Object.keys(value).length === 0
	}

	// Number, Boolean, Symbol, Function, etc.
	return false
}

export default isEmpty
