/**
 * Deep equality comparison module
 *
 * @module isEqual
 * @since 5.12.0
 */

import isArray from './isArray'

/**
 * Internal recursive comparison function
 *
 * Uses Map for O(1) circular reference detection.
 * Adapted from Underscore.js isEqual implementation.
 *
 * @see https://underscorejs.org/#isEqual
 */
const eq = function (a: any, b: any, aMap: Map<any, any>, bMap: Map<any, any>): boolean {
	// Identical objects are equal. `0 === -0`, but they aren't identical.
	// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	if (a === b) return a !== 0 || 1 / a === 1 / b

	// A strict comparison is necessary because `null == undefined`.
	if (a == null || b == null) return a === b

	// Compare `[[Class]]` names.
	const className = toString.call(a)
	if (className !== toString.call(b)) return false

	switch (className) {
		case '[object RegExp]':
		case '[object String]':
			// Primitives and their object wrappers are equivalent
			return `${a}` === `${b}`

		case '[object Number]':
			// NaN equals NaN, but is non-reflexive
			if (+a !== +a) return +b !== +b
			// An egal comparison for other numeric values
			return +a === 0 ? 1 / +a === 1 / (b as unknown as number) : +a === +b

		case '[object Date]':
		case '[object Boolean]':
			// Coerce dates and booleans to numeric primitive values
			return +a === +b
	}

	const areArrays = isArray(a) && isArray(b)

	if (!areArrays) {
		if (typeof a != 'object' || typeof b != 'object') return false

		// Objects with different constructors are not equivalent
		// (except Object/Array from different frames)
		const aCtor = a.constructor
		const bCtor = b.constructor

		if (
			aCtor !== bCtor &&
			!(
				typeof aCtor === 'function' &&
				aCtor instanceof aCtor &&
				typeof bCtor === 'function' &&
				bCtor instanceof bCtor
			) &&
			'constructor' in a &&
			'constructor' in b
		) {
			return false
		}
	}

	// Handle circular references
	if (aMap.has(a)) return bMap.has(b) && aMap.get(a) === b
	if (bMap.has(b)) return false

	// Track objects for circular reference detection
	aMap.set(a, b)
	bMap.set(b, a)

	// Recursively compare objects and arrays
	if (areArrays) {
		// Compare array lengths first
		const length = a.length
		if (length !== b.length) return false

		// Deep compare contents
		for (let i = 0; i < length; i++) {
			if (!eq(a[i], b[i], aMap, bMap)) return false
		}
	} else {
		// Deep compare objects
		const keys = Object.keys(a)

		// Ensure same number of properties
		if (Object.keys(b).length !== keys.length) return false

		// Compare each property
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			if (!(key in b && eq(a[key], b[key], aMap, bMap))) return false
		}
	}

	// Clean up after comparison
	aMap.delete(a)
	bMap.delete(b)

	return true
}

/**
 * Perform deep equality comparison between two values
 *
 * Supports comparison of:
 * - Primitives (number, string, boolean, null, undefined)
 * - Objects (deep property comparison)
 * - Arrays (order-sensitive)
 * - Date objects (by timestamp)
 * - RegExp objects (by source and flags)
 * - Circular references
 * - NaN (NaN equals NaN)
 *
 * @example
 * ```ts
 * // Primitives
 * isEqual(1, 1)                    // true
 * isEqual('a', 'a')                // true
 * isEqual(NaN, NaN)                // true
 * isEqual(0, -0)                   // false (distinguishes +0 and -0)
 *
 * // Objects
 * isEqual({ a: 1 }, { a: 1 })      // true
 * isEqual({ a: 1 }, { a: 1, b: 2 }) // false
 *
 * // Arrays (order-sensitive)
 * isEqual([1, 2], [1, 2])          // true
 * isEqual([1, 2], [2, 1])          // false
 *
 * // Dates
 * isEqual(new Date(2020, 0, 1), new Date(2020, 0, 1)) // true
 *
 * // RegExp
 * isEqual(/test/gi, /test/gi)      // true
 * isEqual(/test/g, /test/i)        // false
 *
 * // Circular references
 * const a: any = { x: 1 }
 * a.self = a
 * const b: any = { x: 1 }
 * b.self = b
 * isEqual(a, b)                    // true
 * ```
 *
 * @template T - Type of first value
 * @template P - Type of second value
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns true if values are deeply equal, false otherwise
 */
function isEqual<T, P>(a: T, b: P): boolean {
	return eq(a, b, new Map(), new Map())
}

export default isEqual
