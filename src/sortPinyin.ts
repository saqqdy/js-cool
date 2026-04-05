/**
 * Check if a string contains Chinese characters (CJK Unified Ideographs)
 */
function containsChinese(str: string): boolean {
	// CJK Unified Ideographs: \u4e00-\u9fff
	// CJK Unified Ideographs Extension A: \u3400-\u4dbf
	// CJK Unified Ideographs Extension B-F: \u20000-\u2ebef (need surrogate pairs)
	return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(str)
}

/**
 * Create cached Intl.Collator instance
 */
function createCollator(options: Intl.CollatorOptions): Intl.Collator {
	return new Intl.Collator(['zh-Hans-CN', 'en-u-kn-true', 'de-DE-u-co-phonebk'], {
		caseFirst: 'false',
		collation: 'pinyin',
		ignorePunctuation: true,
		numeric: true,
		sensitivity: 'variant',
		...options,
	})
}

// Default collator instance (cached)
let defaultCollator: Intl.Collator | null = null

/**
 * Sort Chinese by Chinese phonetic alphabet (pinyin)
 *
 * Features:
 * - Accurate Chinese character detection using Unicode ranges
 * - Proper null/undefined handling (sorted to the end)
 * - Cached Intl.Collator for better performance
 * - Convenient `sort` method for array sorting
 *
 * @example
 * ```js
 * // Basic usage
 * const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
 * items.sort(sortPinyin)
 * // [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 *
 * // With options
 * items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric: true }))
 * // [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 *
 * // Using sort method (returns new sorted array)
 * const sorted = sortPinyin.sort(['张三', '李四', '王五'])
 * // ['李四', '王五', '张三']
 *
 * // Mixed content with null/undefined
 * const mixed = ['中文', null, 'English', undefined, '123']
 * mixed.sort(sortPinyin)
 * // ['123', 'English', '中文', null, undefined] - null/undefined at the end
 * ```
 *
 * @since 5.14.0
 * @param a - The first element for comparison
 * @param b - The second element for comparison
 * @param options - An object adjusting the output format (Intl.CollatorOptions)
 * @returns - negative, zero, or positive number
 */
function sortPinyin<T = string, P = string>(
	a: T,
	b: P,
	options?: Intl.CollatorOptions
): number {
	// Handle null/undefined - sort them to the end
	if (a == null && b == null) return 0
	if (a == null) return 1
	if (b == null) return -1

	const aStr = String(a)
	const bStr = String(b)

	const aIsChinese = containsChinese(aStr)
	const bIsChinese = containsChinese(bStr)

	// Non-Chinese strings come before Chinese strings
	if (aIsChinese && !bIsChinese) return 1
	if (!aIsChinese && bIsChinese) return -1

	// Use cached collator for default options, or create new one for custom options
	const collator = options ? createCollator(options) : (defaultCollator ??= createCollator({}))

	return collator.compare(aStr, bStr)
}

/**
 * Sort an array by pinyin and return a new sorted array
 *
 * @example
 * ```js
 * const sorted = sortPinyin.sort(['张三', '李四', '王五'])
 * // ['李四', '王五', '张三']
 * ```
 *
 * @param array - The array to sort
 * @param options - Intl.CollatorOptions
 * @returns - New sorted array
 */
sortPinyin.sort = <T>(array: T[], options?: Intl.CollatorOptions): T[] => {
	return [...array].sort((a, b) => sortPinyin(a, b, options))
}

export default sortPinyin
