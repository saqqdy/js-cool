/**
 * parse url params
 *
 * @example
 * ```js
 * const result1 = parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test');
 * console.log(result1) // \{"key1":"100","key2":"true","key3":"null","key4":"undefined","key5":"NaN","key6":"10.888","key7":"Infinity","key8":"test"\}
 *
 * const result2 = parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test');
 * console.log(result2) // \{"key1":100,"key2":true,"key3":null,"key5":null,"key6":10.888,"key7":null,"key8":"test"\}
 * ```
 * @param url - url string (like: ?key1=value1&key2=value2)
 * @param covert - Converts a specific string to a corresponding value (Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
 * @returns object
 */
function parseUrlParam(url: string, covert = false) {
	if (!url) {
		console.info('url is required')
		return {}
	}

	url = url.substring(url.lastIndexOf('?') + 1) // delete string before "?"

	const VALUE_MAP = {
		null: null,
		undefined,
		true: true,
		false: false,
		NaN,
		Infinity,
		'-Infinity': -Infinity
	}
	const result: Record<string, unknown> = {}

	url.replace(/([^?&=]+)=([^?&=]*)/g, (rs: string, $1: string, $2: string) => {
		const key = decodeURIComponent($1)
		$2 = decodeURIComponent($2)
		result[key] = $2
		if (covert) {
			if ($2 in VALUE_MAP) result[key] = VALUE_MAP[$2 as keyof typeof VALUE_MAP]
			else if (/^-?\d+(\.\d+)?$/.test($2)) result[key] = Number($2)
		}
		return rs
	})
	if (covert) return result as Record<string, unknown>
	return result as Record<string, string>
}

export default parseUrlParam
