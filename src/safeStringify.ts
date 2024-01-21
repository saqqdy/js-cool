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
 * safeStringify({ a: undefined, b: NaN, c: Infinity })
 * // {"a":"undefined","b":"NaN","c":"Infinity"}
 * ```
 * @param data - JSON Object
 * @param covert - Whether to convert data, default: true
 * @returns - JSON String
 */
function safeStringify(data: any, covert = true): string {
	return JSON.stringify(data, (key, val) => {
		if (covert && [Infinity, -Infinity, undefined, NaN].includes(val)) return String(val)
		return val
	})
}

export default safeStringify
