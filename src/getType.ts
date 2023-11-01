/**
 * Get the target type
 *
 * @since 1.0.2
 * @param target - target
 * @returns type
 */
function getType<T = any>(target: T) {
	const type: Record<
		string,
		| 'array'
		| 'boolean'
		| 'date'
		| 'promise'
		| 'function'
		| 'math'
		| 'window'
		| 'navigator'
		| 'global'
		| 'document'
		| 'symbol'
		| 'number'
		| 'object'
		| 'regexp'
		| 'string'
		| 'undefined'
		| 'null'
		| 'error'
	> = {
		'[object Array]': 'array',
		'[object Boolean]': 'boolean',
		'[object Date]': 'date',
		'[object Promise]': 'promise',
		'[object Function]': 'function', // Function | Class
		'[object AsyncFunction]': 'function',
		'[object GeneratorFunction]': 'function', // Generator
		'[object Math]': 'math', // Math
		'[object Window]': 'window', // Window
		'[object Navigator]': 'navigator', // Navigator
		'[object global]': 'global', // global
		'[object HTMLDocument]': 'document', // document
		'[object Symbol]': 'symbol',
		'[object Number]': 'number',
		'[object Object]': 'object', // Object | Proxy
		'[object RegExp]': 'regexp',
		'[object String]': 'string',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Error]': 'error'
	}

	if (target === null) return 'null'
	else if (typeof target === 'object' || typeof target === 'function')
		return type[Object.prototype.toString.call(target) as keyof typeof type] || 'object'
	return typeof target
}

export default getType
