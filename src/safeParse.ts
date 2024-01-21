/**
 * Secure parsing of JSON strings
 *
 * @example
 * ```js
 * safeParse('100')
 * // 100
 *
 * safeParse('{"a":"undefined","b":"NaN","c":"Infinity"}')
 * // { b: NaN, c: Infinity }
 * ```
 * @param data - JSON string
 * @param covert - Whether to convert data, default: true
 * @returns - JSON Object
 */
function safeParse(data: string, covert = true): any {
	const VALUE_MAP = {
		undefined,
		NaN,
		Infinity,
		'-Infinity': -Infinity
	}
	return JSON.parse(data, (key, val) => {
		if (covert && ['Infinity', '-Infinity', 'undefined', 'NaN'].includes(val)) {
			return VALUE_MAP[val as keyof typeof VALUE_MAP]
		}
		return val
	})
}

export default safeParse
