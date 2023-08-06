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
 * @param size - new array or string length
 * @returns - result
 */
function shuffle(value: string, size?: number): string
function shuffle<T extends unknown[] = unknown[]>(value: T, size?: number): T
function shuffle<T extends unknown[] = unknown[]>(value: T | string, size?: number) {
	let index = -1,
		isString = false
	if (typeof value === 'string') {
		value = value.split('') as T
		isString = true
	}
	// value = value.sort(() => 0.5 - Math.random())
	const length = value.length
	const lastIndex = length - 1

	size = size === undefined ? length : size

	while (++index < size) {
		const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
		const _val = value[rand]
		value[rand] = value[index]
		value[index] = _val
	}
	value.length = size

	return isString ? value.join('') : value
}

export default shuffle
