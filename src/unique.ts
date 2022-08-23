import contains from './contains'
/**
 * 数组去重
 *
 * @example
 * ```js
 * unique([1, 2, 2, '33']) // [1, 2, '33']
 * ```
 * @returns array
 */
function unique<T = unknown>(arr: T[]): T[] {
	let newArray: T[] = []
	for (const el of arr) {
		!contains(newArray, el) && newArray.push(el)
	}
	return newArray
}

export default unique
