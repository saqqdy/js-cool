/**
 * Counts the occurrences of a substring in a string.
 *
 * @example
 * ```ts
 * count('hello hello hello', 'hello')
 * // => 3
 *
 * count('aaa', 'aa')
 * // => 1 (non-overlapping by default)
 *
 * count('aaa', 'aa', { overlapping: true })
 * // => 2 (overlapping matches)
 *
 * count('Hello World', 'hello', { caseSensitive: false })
 * // => 1
 *
 * count('abc', 'd')
 * // => 0
 * ```
 *
 * @since 6.0.0
 */

export interface CountOptions {
	/**
	 * Whether to count overlapping matches (default: false)
	 */
	overlapping?: boolean
	/**
	 * Whether the search is case sensitive (default: true)
	 */
	caseSensitive?: boolean
}

function count(str: string, substring: string, options?: CountOptions): number {
	const { overlapping = false, caseSensitive = true } = options ?? {}

	if (typeof str !== 'string' || typeof substring !== 'string') {
		return 0
	}

	if (substring === '') {
		return 0
	}

	const searchStr = caseSensitive ? str : str.toLowerCase()
	const searchSub = caseSensitive ? substring : substring.toLowerCase()

	if (searchStr.length < searchSub.length) {
		return 0
	}

	let count = 0,
	 pos = 0

	while (true) {
		const index = searchStr.indexOf(searchSub, pos)
		if (index === -1) {
			break
		}
		count++
		pos = overlapping ? index + 1 : index + searchSub.length
	}

	return count
}

export default count
