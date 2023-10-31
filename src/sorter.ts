/**
 * Sorter factory function
 *
 * @since 5.14.0
 * @example
 * ```js
 * const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
 *
 * items.sort(
 * 	sorter('zh-Hans-CN', {
 * 		ignorePunctuation: true,
 * 		sensitivity: 'variant',
 * 		numeric: true
 * 	})
 * )
 * // [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 * ```
 * @param locales - A string with a BCP 47 language tag, or an array of such strings.
 * @param options - An object adjusting the output format.
 * @returns - compare function
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
