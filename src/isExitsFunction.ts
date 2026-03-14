import _eval from './_eval'

/**
 * The presence or absence of the specified function
 *
 * @example
 * ```js
 * // Check global function
 * isExitsFunction('console.log') // true
 *
 * // Check non-existent function
 * isExitsFunction('test') // false
 *
 * // Check built-in functions
 * isExitsFunction('Array.isArray') // true
 * isExitsFunction('JSON.parse') // true
 *
 * // Check nested function
 * isExitsFunction('document.querySelector') // true
 * ```
 * @since 1.0.1
 * @param name - incoming function name
 * @returns - true if function exists
 */
function isExitsFunction(name: string): boolean {
	return typeof _eval(name) === 'function'
}

export default isExitsFunction
