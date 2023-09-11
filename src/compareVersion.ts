/**
 * Version number size comparison, tag version: rc \> beta \> alpha \> other
 *
 * @example
 * ```js
 * compareVersion('1.11.0', '1.9.9')
 * // => 1: 1=Version 1.11.0 is newer than 1.9.9
 *
 * compareVersion('1.11.0', '1.11.0')
 * // => 0: 0=Versions 1.11.0 and 1.11.0 are the same
 *
 * compareVersion('1.11.0', '1.99.0')
 * // => -1: -1=Version 1.11.0 is older than 1.99.0
 *
 * compareVersion('1.0.0.0.0.10', '1.0')
 * // => -1
 *
 * // compare tag version: rc > beta > alpha > other
 * compareVersion('1.11.0', '1.11.0-beta.1')
 * // => -1
 *
 * compareVersion('1.11.0-beta.1', '1.11.0')
 * // => -1
 *
 * compareVersion('1.11.0-beta.10', '1.11.0-beta.10')
 * // => 0
 *
 * compareVersion('1.11.0-alpha.10', '1.11.0-beta.1')
 * // => -1
 *
 * compareVersion('1.11.0-alpha.10', '1.11.0-rc.1')
 * // => -1
 *
 * compareVersion('1.11.0-tag.10', '1.11.0-alpha.1')
 * // => -1
 *
 * compareVersion('1.11.0-tag.10', '1.11.0-tag.1')
 * // => 1
 *
 * compareVersion('1.11.0-release.10', '1.11.0-tag.1')
 * // => 1
 * ```
 * @param input - input version
 * @param compare - compare version
 * @return 1/0/-1
 */
function compareVersion(input: string, compare: string) {
	const VER_TYPES = ['alpha', 'beta', 'rc']
	const [inputVer, inputSubVer = ''] = input.split('-')
	const [compareVer, compareSubVer = ''] = compare.split('-')
	const v1 = inputVer.split('.')
	const v2 = compareVer.split('.')
	const len = Math.max(v1.length, v2.length)

	while (v1.length < len) {
		v1.push('0')
	}
	while (v2.length < len) {
		v2.push('0')
	}

	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i])
		const num2 = parseInt(v2[i])

		if (num1 > num2) return 1
		else if (num1 < num2) return -1
	}

	if (!inputSubVer && !compareSubVer) return 0
	else if (!compareSubVer) return -1
	else if (!inputSubVer) return 1

	const inputSubArr = inputSubVer.split('.')
	const compareSubArr = compareSubVer.split('.')
	inputSubArr[0] = VER_TYPES.indexOf(inputSubArr[0]) + 1 + ''
	compareSubArr[0] = VER_TYPES.indexOf(compareSubArr[0]) + 1 + ''
	return compareVersion(inputSubArr.join('.'), compareSubArr.join('.'))
}

export default compareVersion
