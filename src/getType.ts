/**
 * Get the target type
 *
 * @param target - target
 * @returns type
 */
function getType(target: any): string {
	const type = {
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
		'[object Null]': 'null'
	} as any

	if (target === null) return target + ''
	return typeof target === 'object' || typeof target === 'function'
		? type[Object.prototype.toString.call(target)] || 'object'
		: typeof target
}

export default getType
