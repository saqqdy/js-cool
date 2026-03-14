/**
 * eval alternative method - safely evaluate function names
 *
 * @example
 * ```js
 * // Get global function
 * const log = _eval('console.log')
 * log('Hello') // 'Hello'
 *
 * // Get nested function
 * const parse = _eval('JSON.parse')
 * parse('{"a":1}') // { a: 1 }
 *
 * // Non-existent function
 * const fn = _eval('nonExistentFunction')
 * fn // undefined
 *
 * // Used by isExitsFunction
 * if (_eval('myFunction')) {
 *   myFunction()
 * }
 * ```
 * @param functionName - function name string to evaluate
 * @returns - Function | undefined
 */
function _eval(functionName: string): Function | undefined {
	const Fn = Function
	try {
		return new Fn('return ' + functionName)()
	} catch {
		return undefined
	}
}

export default _eval
