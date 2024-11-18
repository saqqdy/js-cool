export interface SpliceUrlParamOptions {
	covert?: boolean
	encode?: boolean
	withQuestionsMark?: boolean
}

/**
 * splice url params
 *
 * @example
 * ```js
 * spliceUrlParam('\{"key1":"100","key2":true,"key3":null,"key4":undefined,"key5":"测试"\}')
 * // ?key1=100&key2=true&key3=null&key4=undefined&key5=测试
 *
 * spliceUrlParam('\{"key1":"100","key2":true,"key3":null,"key4":undefined\}', true)
 * // ?key1=100&key2=true&key3=&key4=
 *
 * spliceUrlParam('\{"key1":"100","key2":true,"key3":null,"key4":undefined\}', true, false)
 * // key1=100&key2=true&key3=&key4=
 * ```
 * @since 5.3.0
 * @param params - json object
 * @param covert - Convert a null value type (null/undefined/) to an empty string, default: false
 * @returns - result
 */
function spliceUrlParam<T extends Record<string, unknown>>(
	params: T,
	covert: SpliceUrlParamOptions | boolean = false
): string {
	if (!params) {
		console.info('params is required')
		return ''
	}
	let encode = false,
		withQuestionsMark = true,
		key: keyof typeof params

	if (typeof covert === 'object') {
		encode = covert.encode ?? false
		withQuestionsMark = covert.withQuestionsMark ?? true
		covert = covert.covert ?? false
	}

	const result: string[] = []
	for (key in params) {
		if (typeof key === 'string') {
			const val = '' + (covert ? (params[key] ?? '') : params[key])
			result.push(`${key}=${encode ? encodeURIComponent(val) : val}`)
		}
	}

	if (withQuestionsMark) return '?' + result.join('&')
	return result.join('&')
}

export default spliceUrlParam
