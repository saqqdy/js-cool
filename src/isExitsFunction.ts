import _eval from './_eval'

/**
 * The presence or absence of the specified function
 *
 * @param funcName - incoming function name
 * @returns returns true/false
 */
function isExitsFunction(funcName: string): boolean {
	return typeof _eval(funcName) === 'function'
}

export default isExitsFunction
