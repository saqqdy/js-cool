/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 *
 * @example
 * ```ts
 * groupBy([{ a: 1 }, { a: 2 }, { a: 1 }], 'a')
 * // => { '1': [{ a: 1 }, { a: 1 }], '2': [{ a: 2 }] }
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * groupBy(['one', 'two', 'three'], 'length')
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * ```
 *
 * @since 6.0.0
 * @param array - The array to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns - Returns the composed aggregate object
 */
function groupBy<T>(
	array: T[],
	iteratee: keyof T | ((value: T) => string | number)
): Record<string, T[]> {
	if (!Array.isArray(array)) {
		return {}
	}

	const result: Record<string, T[]> = {}

	for (const item of array) {
		let key: string | number

		if (typeof iteratee === 'function') {
			key = iteratee(item)
		} else {
			key = item[iteratee] as string | number
		}

		const keyStr = String(key)
		if (!result[keyStr]) {
			result[keyStr] = []
		}
		result[keyStr].push(item)
	}

	return result
}

export default groupBy
