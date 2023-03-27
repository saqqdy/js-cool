/**
 * eval替代方法
 *
 * return - Function | undefined
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
