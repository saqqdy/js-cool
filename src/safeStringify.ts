import { isSafeInteger } from './_compat'

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
			// Check for special values (NaN needs special handling since NaN !== NaN)
			if (val === Infinity) return 'Infinity'
			if (val === -Infinity) return '-Infinity'
			if (val === undefined) return 'undefined'
			if (typeof val === 'number' && val !== val) return 'NaN' // NaN check
			// Check for unsafe integers (outside safe range or non-integer)
			if (typeof val === 'number' && val === val && isFinite(val) && !isSafeInteger(val))
				return String(BigInt(val))
			else if (typeof val === 'bigint') return String(val)
		} else if (typeof val === 'bigint') return String(val)

		return val
	})
}

export default safeStringify
