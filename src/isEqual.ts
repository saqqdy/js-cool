import isArray from './isArray'

// @see https://underscorejs.org/#isEqual
// Internal recursive comparison function for `isEqual`.
const eq = function (a: any, b: any, aStack?: any[], bStack?: any[]) {
	// Identical objects are equal. `0 === -0`, but they aren't identical.
	// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	if (a === b) return a !== 0 || 1 / a === 1 / b
	// A strict comparison is necessary because `null == undefined`.
	if (a == null || b == null) return a === b
	// Compare `[[Class]]` names.
	const className = toString.call(a)
	if (className !== toString.call(b)) return false
	switch (className) {
		// Strings, numbers, regular expressions, dates, and booleans are compared by value.
		case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
		case '[object String]':
			// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
			// equivalent to `new String("5")`.
			return '' + a === '' + b
		case '[object Number]':
			// `NaN`s are equivalent, but non-reflexive.
			// Object(NaN) is equivalent to NaN
			// eslint-disable-next-line no-self-compare
			if (+a !== +a) return +b !== +b
			// An `egal` comparison is performed for other numeric values.
			return +a === 0 ? 1 / +a === 1 / (b as unknown as number) : +a === +b
		case '[object Date]':
		case '[object Boolean]':
			// Coerce dates and booleans to numeric primitive values. Dates are compared by their
			// millisecond representations. Note that invalid dates with millisecond representations
			// of `NaN` are not equivalent.
			return +a === +b
	}

	const areArrays = isArray(a) && isArray(b)
	if (!areArrays) {
		if (typeof a != 'object' || typeof b != 'object') return false

		// Objects with different constructors are not equivalent, but `Object`s or `Array`s
		// from different frames are.
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
	// Assume equality for cyclic structures. The algorithm for detecting cyclic
	// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	// Initializing stack of traversed objects.
	// It's done here since we only need them for objects and arrays comparison.
	aStack = aStack || []
	bStack = bStack || []
	let length = aStack.length
	while (length--) {
		// Linear search. Performance is inversely proportional to the number of
		// unique nested structures.
		if (aStack[length] === a) return bStack[length] === b
	}

	// Add the first object to the stack of traversed objects.
	aStack.push(a)
	bStack.push(b)

	// Recursively compare objects and arrays.
	if (areArrays) {
		// Compare array lengths to determine if a deep comparison is necessary.
		length = a.length
		if (length !== b.length) return false
		// Deep compare the contents, ignoring non-numeric properties.
		while (length--) {
			if (!eq(a[length], b[length], aStack, bStack)) return false
		}
	} else {
		// Deep compare objects.
		const keys = Object.keys(a)
		let key: keyof typeof a
		length = keys.length
		// Ensure that both objects contain the same number of properties before comparing deep equality.
		if (Object.keys(b).length !== length) return false
		while (length--) {
			// Deep compare each member
			key = keys[length] as never
			if (!(key in b && eq(a[key], b[key], aStack, bStack))) return false
		}
	}
	// Remove the first object from the stack of traversed objects.
	aStack.pop()
	bStack.pop()
	return true
}

/**
 * Determine if 2 objects are equal
 *
 * @example
 * ```js
 * isEqual({ a: 22, b: {} }, { b: {}, a: 22 })
 * // true
 *
 * isEqual([1, 2], [2, 1])
 * // false
 *
 * isEqual(NaN, NaN)
 * // true
 * ```
 * @since 5.12.0
 * @param a - source
 * @param b - compare
 * @returns - a equals to b
 */
function isEqual<T, P>(a: T, b: P): boolean {
	return eq(a, b)
}

export default isEqual
