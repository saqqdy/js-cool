/**
 * Secure stringify of JSON Object
 *
 * @example
 * ```js
 * safeStringify(100)
 * // "100"
 *
 * safeStringify(undefined)
 * // "undefined"
 *
 * safeStringify(NaN)
 * // "NaN"
 *
 * safeStringify(Infinity)
 * // "Infinity"
 *
 * safeStringify({ a: undefined, b: NaN, c: Infinity, d: BigInt(Number.MAX_SAFE_INTEGER) + 2n })
 * // {"a":"undefined","b":"NaN","c":"Infinity","d":"9007199254740993"}
 * ```
 * @param data - JSON Object
 * @param covert - Whether to convert data, default: true
 * @returns - JSON String
 */
function safeStringify(data: any, covert = true): string {
	return JSON.stringify(data, (key, val) => {
		if (covert) {
			if ([Infinity, -Infinity, undefined, NaN].includes(val)) return String(val)
			else if (typeof val === 'number' && !Number.isSafeInteger(val))
				return String(BigInt(val))
		} else if (typeof val === 'bigint') return String(val)
		return val
	})
}

export default safeStringify
