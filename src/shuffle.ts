/**
 * shuffling algorithm, Reordering arrays or strings
 *
 * @example
 * ```ts
 * const str = 'abcde'
 * const arr = [1,2,3]
 *
 * shuffle(str)
 * // cdbse
 * shuffle(arr)
 * // [3,1,2]
 * ```
 * @param value - arrays or strings
 * @returns result
 */
function shuffle<T extends unknown[] = unknown[]>(value: T | string) {
	let isString = false
	if (typeof value === 'string') {
		value = value.split('') as T
		isString = true
	}
	value = value.sort(() => 0.5 - Math.random())
	return isString ? value.join('') : value
}

export default shuffle
