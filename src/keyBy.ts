/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * The corresponding value of each key is the last element responsible for generating the key.
 *
 * @example
 * ```ts
 * keyBy([{ id: 'a', name: 'Alice' }, { id: 'b', name: 'Bob' }], 'id')
 * // => { a: { id: 'a', name: 'Alice' }, b: { id: 'b', name: 'Bob' } }
 *
 * keyBy([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], 'id')
 * // => { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }
 *
 * keyBy(['a', 'b', 'c'], (v) => v.toUpperCase())
 * // => { A: 'a', B: 'b', C: 'c' }
 * ```
 *
 * @since 6.0.0
 * @param array - The array to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns - Returns the composed aggregate object
 */
function keyBy<T>(
	array: T[],
	iteratee: keyof T | ((value: T) => string | number)
): Record<string, T> {
	if (!Array.isArray(array)) {
		return {}
	}

	const result: Record<string, T> = {}

	for (const item of array) {
		let key: string | number

		if (typeof iteratee === 'function') {
			key = iteratee(item)
		} else {
			key = item[iteratee] as string | number
		}

		result[String(key)] = item
	}

	return result
}

export default keyBy
