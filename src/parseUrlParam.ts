import pattern from './pattern'

/**
 * parse url params
 *
 * @example
 * ```js
 * // Basic usage - returns strings
 * parseUrlParam('?key1=100&key2=true&key3=null')
 * // { key1: '100', key2: 'true', key3: 'null' }
 *
 * // With type conversion
 * parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888', true)
 * // { key1: 100, key2: true, key3: null, key5: NaN, key6: 10.888 }
 *
 * // Special values
 * parseUrlParam('?inf=Infinity&negInf=-Infinity', true)
 * // { inf: Infinity, negInf: -Infinity }
 *
 * // Empty/missing values
 * parseUrlParam('?empty=&missing')
 * // { empty: '', missing: '' }
 *
 * // URL encoded values
 * parseUrlParam('?name=John%20Doe&email=test%40example.com')
 * // { name: 'John Doe', email: 'test@example.com' }
 * ```
 * @since 5.0.0
 * @param url - url string (like: ?key1=value1&key2=value2)
 * @param covert - Converts specific strings to corresponding values (default: false)
 * @returns object with parsed parameters
 */
function parseUrlParam(url: string, covert = false): Record<string, unknown> {
	if (!url) {
		console.info('url is required')

		return {}
	}

	url = url.substring(url.lastIndexOf('?') + 1) // delete string before "?"

	const VALUE_MAP = {
		'-Infinity': -Infinity,
		false: false,
		Infinity,
		NaN: Number.NaN,
		null: null,
		true: true,
		undefined,
	}
	const result: Record<string, unknown> = {}

	url.replace(/([^?&=]+)=([^?&=]*)/g, (rs: string, $1: string, $2: string) => {
		const key = decodeURIComponent($1)

		$2 = decodeURIComponent($2)
		result[key] = $2
		if (covert) {
			if ($2 in VALUE_MAP) result[key] = VALUE_MAP[$2 as keyof typeof VALUE_MAP]
			else if (pattern.number.test($2)) result[key] = Number($2)
		}

		return rs
	})
	if (covert) return result as Record<string, unknown>

	return result as Record<string, string>
}

export default parseUrlParam
