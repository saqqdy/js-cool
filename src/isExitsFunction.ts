import _eval from './_eval'

/**
 * The presence or absence of the specified function
 *
 * @example
 * ```js
 * isExitsFunction('test') // false
 * isExitsFunction('console.log') // true
 * ```
 * @param name - incoming function name
 * @returns - true/false
 */
function isExitsFunction(name: string): boolean {
	return typeof _eval(name) === 'function'
}

export default isExitsFunction
