import sorter from './sorter'

/**
 * Sort Chinese by Chinese phonetic alphabet
 *
 * @example
 * ```js
 * const items = ['啊我', '波拉', 'abc', 0, 3, '10', ',11', 13, null, '阿吧', 'ABB', 'BDD', 'ACD', 'ä']
 *
 * items.sort(sortPinyin)
 * // [ ",11", 0, "10", 13, 3, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 *
 * items.sort((a, b) => sortPinyin(a, b, { ignorePunctuation: true, numeric:true }))
 * // [ 0, 3, "10", ",11", 13, "ä", "ABB", "abc", "ACD", "BDD", null, "阿吧", "啊我", "波拉" ]
 * ```
 * @since 5.14.0
 * @param a - The first element for comparison.
 * @param b - The second element for comparison.
 * @param options - An object adjusting the output format.
 * @returns - number
 */
function sortPinyin<T = string, P = string>(a: T, b: P, options: Intl.CollatorOptions = {}) {
	// const aIsNumber = !isNaN(+a)
	// const bIsNumber = !isNaN(+b)

	// if (aIsNumber && bIsNumber) return +a - +b
	// else if (aIsNumber) return -1
	// else if (bIsNumber) return 1

	const aIsHans = /[^\x00-\xFF]+/g.test(String(a)) // eslint-disable-line no-control-regex
	const bIsHans = /[^\x00-\xFF]+/g.test(String(b)) // eslint-disable-line no-control-regex

	if (aIsHans && !bIsHans) return 1
	if (!aIsHans && bIsHans) return -1

	return sorter(['zh-Hans-CN', 'en-u-kn-true', 'de-DE-u-co-phonebk'], {
		ignorePunctuation: true,
		sensitivity: 'variant',
		numeric: true,
		collation: 'pinyin',
		caseFirst: 'false',
		...options
	})(a, b)
}

export default sortPinyin
