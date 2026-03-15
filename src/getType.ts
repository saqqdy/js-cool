/**
 * Get the target type
 *
 * @example
 * ```js
 * // Primitive types
 * getType(123)        // 'number'
 * getType('hello')    // 'string'
 * getType(true)       // 'boolean'
 * getType(undefined)  // 'undefined'
 * getType(null)       // 'null'
 *
 * // Reference types
 * getType([])         // 'array'
 * getType({})         // 'object'
 * getType(() => {})   // 'function'
 * getType(/regex/)    // 'regexp'
 * getType(new Date()) // 'date'
 *
 * // Special objects
 * getType(window)     // 'window'
 * getType(document)   // 'document'
 * getType(Promise.resolve()) // 'promise'
 * getType(new Error()) // 'error'
 *
 * // Class
 * class MyClass {}
 * getType(MyClass)    // 'function'
 * ```
 * @since 1.0.2
 * @param target - target
 * @returns type string
 */
function getType<T = any>(target: T): string {
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
		'[object AsyncFunction]': 'function',
		'[object Boolean]': 'boolean',
		'[object Date]': 'date',
		'[object Error]': 'error',
		'[object Function]': 'function', // Function | Class
		'[object GeneratorFunction]': 'function', // Generator
		'[object global]': 'global', // global
		'[object HTMLDocument]': 'document', // document
		'[object Math]': 'math', // Math
		'[object Navigator]': 'navigator', // Navigator
		'[object Null]': 'null',
		'[object Number]': 'number',
		'[object Object]': 'object', // Object | Proxy
		'[object Promise]': 'promise',
		'[object RegExp]': 'regexp',
		'[object String]': 'string',
		'[object Symbol]': 'symbol',
		'[object Undefined]': 'undefined',
		'[object Window]': 'window', // Window
	}

	if (target === null) return 'null'
	else if (typeof target === 'object' || typeof target === 'function')
		return type[Object.prototype.toString.call(target) as keyof typeof type] || 'object'

	return typeof target
}

export default getType
