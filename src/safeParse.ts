import { isSafeInteger } from './_compat'

/**
 * Secure parsing of JSON strings
 *
 * @example
 * ```js
 * safeParse('100')
 * // 100
 *
 * safeParse('{"a":"undefined","b":"NaN","c":"Infinity","d":"9007199254740993"}')
 * // { b: NaN, c: Infinity, d: 9007199254740993n }
 * ```
 * @param data - JSON string
 * @param covert - Whether to convert data, default: true
 * @returns - JSON Object
 */
function safeParse(data: string, covert = true): any {
	const VALUE_MAP = {
		'-Infinity': -Infinity,
		Infinity,
		NaN,
		undefined,
	}
	const SPECIAL_VALUES = ['Infinity', '-Infinity', 'undefined', 'NaN']

	try {
		return JSON.parse(data, (key, val) => {
			if (covert && SPECIAL_VALUES.indexOf(val) !== -1)
				return VALUE_MAP[val as keyof typeof VALUE_MAP]
			else if (
				typeof val === 'string' &&
				/^(-|\+)?\d+(\.\d+)?$/.test(val) &&
				!isSafeInteger(+val)
			)
				return BigInt(val)

			return val
		})
	} catch {
		return null
	}
}

export default safeParse
