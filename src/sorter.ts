/**
 * Sorter factory function
 *
 * @example
 * ```js
 * // Basic usage
 * const items = ['b', 'a', 'c']
 * items.sort(sorter('en'))
 * // ['a', 'b', 'c']
 *
 * // Chinese sorting
 * const chineseItems = ['啊我', '波拉', '阿吧']
 * chineseItems.sort(sorter('zh-Hans-CN'))
 *
 * // With options
 * const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
 * items.sort(
 *   sorter('zh-Hans-CN', {
 *     ignorePunctuation: true,
 *     sensitivity: 'variant',
 *     numeric: true
 *   })
 * )
 * // [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 *
 * // Numeric sorting
 * ['10', '2', '1'].sort(sorter('en', { numeric: true }))
 * // ['1', '2', '10']
 * ```
 * @since 5.14.0
 * @param locales - A string with a BCP 47 language tag, or an array of such strings.
 * @param options - An object adjusting the output format.
 * @returns - compare function for Array.sort()
 */
function sorter(locales?: string | string[], options?: Intl.CollatorOptions) {
	return function <T = string, P = string>(a: T, b: P) {
		const canUse = canUseLocales()

		return canUse
			? String(a).localeCompare(String(b), locales, options)
			: String(a).localeCompare(String(b))
	}
}

/**
 * Check browser support for extended arguments
 *
 * @returns - result
 */
function canUseLocales() {
	try {
		''.localeCompare('', 'i')
	} catch (err: any) {
		return err.name === 'RangeError'
	}
	return false
}

export default sorter
