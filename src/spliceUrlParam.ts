/**
 * splice url params
 *
 * @example
 * ```js
 * spliceUrlParam('\{"key1":"100","key2":"true","key3":"null","key4":"undefined","key5":"测试"\}')
 * // ?key1=100&key2=true&key3=null&key4=undefined&key5=测试
 *
 * spliceUrlParam('\{"key1":"100","key2":"true","key3":"null","key4":"undefined"\}', true)
 * // ?key1=100&key2=true&key3=&key4=
 *
 * spliceUrlParam('\{"key1":"100","key2":"true","key3":"null","key4":"undefined"\}', true, false)
 * // key1=100&key2=true&key3=&key4=
 * ```
 * @since 5.3.0
 * @param params - json object
 * @param covert - Convert a null value type (null/undefined/) to an empty string
 * @param withQuestionsMark - Splicing a question mark, default: true
 * @returns - result
 */
function spliceUrlParam<T extends Record<string, unknown>>(
	params: T,
	covert = false,
	withQuestionsMark = true
) {
	if (!params) {
		console.info('params is required')
		return ''
	}

	let key: keyof typeof params
	const result: string[] = []
	for (key in params) {
		typeof key === 'string' &&
			result.push(`${key}=${'' + (covert ? params[key] ?? '' : params[key])}`)
	}

	if (withQuestionsMark) return '?' + result.join('&')
	return result.join('&')
}

export default spliceUrlParam
