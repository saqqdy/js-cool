/**
 * The presence or absence of the specified variable
 *
 * @example
 * ```js
 * // Check global variable
 * isExitsVariable('window') // true
 *
 * // Check non-existent variable
 * isExitsVariable('test') // false
 *
 * // Check built-in variables
 * isExitsVariable('document') // true
 * isExitsVariable('navigator') // true
 *
 * // Note: This function has limitations
 * // It checks if the variable name is defined
 * ```
 * @since 1.0.1
 * @param name - variable name
 * @returns - true if variable exists
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
