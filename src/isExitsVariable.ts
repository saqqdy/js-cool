/**
 * The presence or absence of the specified variable
 *
 * @example
 * ```js
 * isExitsVariable('test') // false
 * isExitsVariable('window') // true
 * ```
 * @since 1.0.1
 * @param name - variable name
 * @returns - true/false
 */
function isExitsVariable(name: string): boolean {
	try {
		if (typeof name === 'undefined') {
			return false
		} else {
			return true
		}
	} catch {}
	return false
}

export default isExitsVariable
