/**
 * The presence or absence of the specified variable
 *
 * @param variableName - variable name
 * @returns returns true/false
 */
function isExitsVariable(variableName: string): boolean {
	try {
		if (typeof variableName === 'undefined') {
			return false
		} else {
			return true
		}
	} catch {}
	return false
}

export default isExitsVariable
